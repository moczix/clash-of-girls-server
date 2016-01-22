    <meta charset="utf-8">
<?php
include_once('function.php');
$link = mysql_connect('localhost', 'root', 'moczniak92');
if (!$link) {
    die('Could not connect: ' . mysql_error());
}
mysql_select_db('mmwMobile', $link);
mysql_query("SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'", $link);



$itemki = mysql_query("SELECT * FROM items1 WHERE locID != 0");

mysql_query("DELETE FROM tempSklep");
while($it = mysql_fetch_array($itemki))
{
	
	$val = rand($it['min1'], $it['max1']);
	mysql_query("INSERT INTO tempSklep SET itemID='".$it['itemID']."', val='".$val."', cena='".($val*1500)."'");
	
}


$sixHour = time()+(6 * 60 * 60);


mysql_query("UPDATE ZZZsystem SET sklepNextRefresh='".$sixHour."' WHERE setID='1'");


newSettings();

?>