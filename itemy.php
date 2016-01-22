    <meta charset="utf-8">
<?php

$link = mysql_connect('localhost', 'root', 'moczniak92');
if (!$link) {
    die('Could not connect: ' . mysql_error());
}
mysql_select_db('dziwki', $link);
mysql_query("SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'", $link);

$dane = mysql_query("SELECT * FROM items_db_1 ORDER BY szansa ASC");




$level = array(
"0.001"=> "230",
"0.002"=> "220",
"0.01"=> "210",
"0.02"=> "200",
"0.03"=> "190",
"0.05"=> "180",
"0.6"=> "170",
"0.7"=> "160",
"0.8"=> "150",
"0.9"=> "140",
"2"=> "120",
"6" => "100",
"7" => "80",
"8"=> "70",
"9" => "60",
"10"=> "57",
"12"=> "52",
"13"=> "47",
"14"=> "44",
"18" => "40",
"27"=> "35",
"28"=> "28",
"29"=> "23",
"30" => "20",
"35" => "18",
"38" => "15",
"40" => "12",
"45" => "7",
"50" => "0"
);

$slocReplace22 = array(
"0.001"=> "0",
"0.002"=> "0",
"0.01"=> "0",
"0.02"=> "0",
"0.03"=> "0",
"0.05"=> "0",
"0.6"=> "0",
"0.7"=> "0",
"0.8"=> "0",
"0.9"=> "0",
"2"=> "0",
"6" => "0",
"7" => "0",
"8"=> "0",
"9" => "0",
"10"=> "0",
"12"=> "0",
"13"=> "0",
"14"=> "0",
"18" => "0",
"27"=> "0",
"28"=> "0",
"29"=> "0",
"30" => "0",
"35" => "0",
"38" => "0",
"40" => "0",
"45" => "4",
"50" => "2"
);


$slocReplace = array(
"0.001"=> "0",
"0.002"=> "0",
"0.01"=> "0",
"0.02"=> "0",
"0.03"=> "0",
"0.05"=> "0",
"0.6"=> "0",
"0.7"=> "0",
"0.8"=> "0",
"0.9"=> "0",
"2"=> "25",
"6" => "24",
"7" => "23",
"8"=> "22",
"9" => "21",
"10"=> "20",
"12"=> "19",
"13"=> "18",
"14"=> "17",
"18" => "16",
"27"=> "15",
"28"=> "14",
"29"=> "13",
"30" => "12",
"35" => "10",
"38" => "9",
"40" => "5",
"45" => "3",
"50" => "1"
);

$szansaReplace = array(
"0.001"=> "0.01",
"0.002"=> "0.1",
"0.01"=> "0.15",
"0.02"=> "0.25",
"0.03"=> "0.4",
"0.05"=> "0.6",
"0.6"=> "0.8",
"0.7"=> "1",
"0.8"=> "1.2",
"0.9"=> "1.5",
"2"=> "2",
"6" => "6",
"7" => "7",
"8"=> "8",
"9" => "9",
"10"=> "10",
"12"=> "11",
"13"=> "12",
"14"=> "14",
"18" => "18",
"27"=> "27",
"28"=> "28",
"29"=> "29",
"30" => "30",
"35" => "35",
"38" => "38",
"40" => "40",
"45" => "45",
"50" => "50"
);

$nameReplace = array(
	"dildo"=>"kosmetyki",
	"gumy"=>"odziez",
	"kajdanki"=>"bizuteria",
	"kulki" =>"obuwie",
	"pejcze"=>"dodatki",
	"sznury"=>"bielizna",
	"wibratory"=>"zabawki"



);

$array = array();
$break = 0;
$rare = 1;
$loc = 0;
$loc = 2;

$z = 1;
mysql_select_db('mmwMobile', $link);
mysql_query("DELETE FROM items1");
while($d = mysql_fetch_assoc($dane)){

$nr = $z++;
mysql_query("INSERT INTO items1 SET itemID='".$nr."', nazwa='nazwaTymczasowa', typ1='".$nameReplace[$d['typ1']]."', min1='".intval($d['min1']/100)."', max1='".intval($d['max1']/100)."', szansa='".$szansaReplace[$d['szansa']]."', rare='".$rare."', locID='".$slocReplace[$d['szansa']]."', orlocID='".$slocReplace22[$d['szansa']]."', level='".$level[$d['szansa']]."', image_src='".$d['image_src']."'");


$string = '$itemy[] = (';
$string .= "'nr'=>"."'".$nr."'".", ";
$string .= "'nazwa'=>"."'".$d['nazwa']."'".", ";
$string .= "'typ1'=>"."'".$nameReplace[$d['typ1']]."'".", ";
$string .= "'min1'=>"."'".intval($d['min1']/100)."'".", ";
$string .= "'max1'=>"."'".intval($d['max1']/100)."'".", ";
$string .= "'szansa'=>"."'".$szansaReplace[$d['szansa']]."'".", ";
$string .= "'rare'=>"."'".$rare."'".", ";
$string .= "'locID'=>"."'".$slocReplace[$d['szansa']]."'".", ";
$string .= "'level'=>"."'".$level[$d['szansa']]."'".", ";
$string .= "'image_src'=>"."'".$d['image_src']."'"."); ";

$all .=$string.'<br>'; 

if($d['szansa'] >= 2)
{

	if(!$break)
	{
		$all .=  '<br><br>';
		$break = true;
		$rare = 0;
	}
}



}


echo $all;
