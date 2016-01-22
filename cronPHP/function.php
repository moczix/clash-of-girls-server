<?php


function newSettings()
{
	
$link = mysql_connect('localhost', 'root', 'moczniak92');
if (!$link) {
    die('Could not connect: ' . mysql_error());
}
mysql_select_db('mmwMobile', $link);
mysql_query("SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'", $link);

$dane = mysql_query("SELECT * FROM ZZZsystem WHERE setID='1'");
$dane = mysql_fetch_assoc($dane);

/*
	$bodytag = file_get_contents('/var/www/makemewell.pl/public_html/mmw/cronPHP/sett.js.templ');
		
	$bodytag = str_replace("{sklepRefresh}", $dane['sklepNextRefresh'], $bodytag);
	$bodytag = str_replace("{rankingRefresh}", $dane['rankingNextRefresh'], $bodytag);
	*/
	$path = '/var/www/makemewell.pl/public_html/mmw/config/sett.json';
	
	$array = array("sklepNextRefresh"=> $dane['sklepNextRefresh'], "rankingNextRefresh"=>$dane['rankingNextRefresh'], "haremHour"=>$dane['haremHour']);

	$json = json_encode($array);
	//$path = '../config/sett.js';
	file_put_contents($path, $json);	
	
}