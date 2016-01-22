    <meta charset="utf-8">
<?php
include_once('function.php');
$link = mysql_connect('localhost', 'root', 'moczniak92');
if (!$link) {
    die('Could not connect: ' . mysql_error());
}
mysql_select_db('mmwMobile', $link);
mysql_query("SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'", $link);





$nextMonday = strtotime( "next monday" );
mysql_query("UPDATE ZZZsystem SET rankingNextRefresh='".$nextMonday."' WHERE setID='1'");


newSettings();