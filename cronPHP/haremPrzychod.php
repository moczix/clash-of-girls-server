<meta charset="utf-8">
<?php
include_once('function.php');
$link = mysql_connect('localhost', 'root', 'moczniak92');
if (!$link) {
    die('Could not connect: ' . mysql_error());
}
mysql_select_db('mmwMobile', $link);
mysql_query("SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'", $link);



$members = mysql_query("SELECT uid FROM members");

while($mm = mysql_fetch_assoc($members))
{
	$harems = mysql_query("SELECT * FROM membersHarem WHERE uid='".$mm['uid']."'");
	$przychod = 0;
	while($hh = mysql_fetch_assoc($harems))
	{
		$dtl = mysql_fetch_assoc(mysql_query("SELECT * FROM harem WHERE haremID='".$hh['haremID']."'"));
		$przychod += ($hh['amount'] * $dtl['hajs']);
	}
	if($przychod > 0)
	{
		mysql_query("UPDATE members SET hajs=hajs+'".$przychod."' WHERE uid='".$mm['uid']."'");
	}
}



$orig_date = date('Y-m-d H:i:s'); 

$seconds = strtotime($orig_date); 

$plus_one_hour = $seconds + 3600; 

$next_hour = floor($plus_one_hour / 3600) * 3600; 

mysql_query("UPDATE ZZZsystem SET haremHour='".$next_hour."' WHERE setID='1'");


newSettings();