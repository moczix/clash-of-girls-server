    <meta charset="utf-8">
<?php

$link = mysql_connect('localhost', 'root', 'moczniak92');
if (!$link) {
    die('Could not connect: ' . mysql_error());
}
mysql_select_db('mmwMobile', $link);
mysql_query("SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'", $link);



##DYSKOTEKA 
$dane[] = array("locID"=>1 ,"myID"=>1,"opis"=>"", "chcica"=>1 , "chciceNeed"=>0 , "hajsMin"=>250, "hajsMax"=>1000 , "procent"=>30, "item"=>0, "nazwa"=>"Chcący prawiczek" );
$dane[] = array("locID"=>1 ,"myID"=>2 ,"opis"=>"", "chcica"=>3 , "chciceNeed"=>0 , "hajsMin"=>400, "hajsMax"=>1280 , "procent"=>25, "item"=>0, "nazwa"=>"Napalony Tancerz" );
$dane[] = array("locID"=>1 ,"myID"=>3 ,"opis"=>"", "chcica"=>4 , "chciceNeed"=>0 , "hajsMin"=>300, "hajsMax"=>1500 , "procent"=>20, "item"=>0, "nazwa"=>"Stawiacz Drinów" );
$dane[] = array("locID"=>1 ,"myID"=>4 ,"opis"=>"", "chcica"=>5 , "chciceNeed"=>0 , "hajsMin"=>500, "hajsMax"=>1700 , "procent"=>15, "item"=>0, "nazwa"=>"Komendant Imprezy" );
$dane[] = array("locID"=>1 ,"myID"=>5 ,"opis"=>"", "chcica"=>8 , "chciceNeed"=>0 , "hajsMin"=>785, "hajsMax"=>1865 , "procent"=>13, "item"=>0, "nazwa"=>"Kryptogej"  );
$dane[] = array("locID"=>1 ,"myID"=>6 ,"opis"=>"", "chcica"=>4 , "chciceNeed"=>0 , "hajsMin"=>890, "hajsMax"=>2200 , "procent"=>12, "item"=>0, "nazwa"=>"Blondyn Z Zewem Godowym" );
$dane[] = array("locID"=>1 ,"myID"=>7 ,"opis"=>"", "chcica"=>6 , "chciceNeed"=>0 , "hajsMin"=>1400, "hajsMax"=>3500 , "procent"=>10, "item"=>0, "nazwa"=>"Turbololitka" );
$dane[] = array("locID"=>1 ,"myID"=>8 ,"opis"=>"", "chcica"=>8 , "chciceNeed"=>50 , "hajsMin"=>1785, "hajsMax"=>3900 , "procent"=>5, "item"=>0, "nazwa"=>"Ostatni Gość Na Imprezie" );
$dane[] = array("locID"=>1 ,"myID"=>9 ,"opis"=>"", "chcica"=>7 , "chciceNeed"=>80 , "hajsMin"=>1000, "hajsMax"=>5000 , "procent"=>6, "item"=>0, "nazwa"=>"Student, Który Zażył Dziś Sporo Edukacji" );
$dane[] = array("locID"=>1 ,"myID"=>10 ,"opis"=>"", "chcica"=>10 , "chciceNeed"=>120 , "hajsMin"=>1700, "hajsMax"=>5500 , "procent"=>8, "item"=>1, "nazwa"=>"Napruty Wsiok" );



##AUTOSTRADA 
$dane[] = array("locID"=>2 ,"myID"=>11 ,"opis"=>"", "chcica"=>3 , "chciceNeed"=> 0, "hajsMin"=>4000, "hajsMax"=>7000 , "procent"=>20, "item"=>0, "nazwa"=>"Janusz niedzielny" );
$dane[] = array("locID"=>2 ,"myID"=>12 ,"opis"=>"", "chcica"=>6 , "chciceNeed"=> 0, "hajsMin"=>7500, "hajsMax"=>10570 , "procent"=>16, "item"=>0, "nazwa"=>"Stefan z tira" );
$dane[] = array("locID"=>2 ,"myID"=>13 ,"opis"=>"", "chcica"=>8 , "chciceNeed"=> 0, "hajsMin"=>12000, "hajsMax"=>19500 , "procent"=>13, "item"=>0, "nazwa"=>"Menel spod biedry" );
$dane[] = array("locID"=>2 ,"myID"=>14 ,"opis"=>"", "chcica"=>4 , "chciceNeed"=> 0, "hajsMin"=>7000, "hajsMax"=>10000 , "procent"=>12, "item"=>0, "nazwa"=>"Rowerzysta" );
$dane[] = array("locID"=>2 ,"myID"=>15 ,"opis"=>"", "chcica"=>5 , "chciceNeed"=> 0, "hajsMin"=>8000, "hajsMax"=>11000 , "procent"=>12, "item"=>0, "nazwa"=>"Survivalowiec" );
$dane[] = array("locID"=>2 ,"myID"=>16 ,"opis"=>"", "chcica"=>8 , "chciceNeed"=> 100, "hajsMin"=>15000, "hajsMax"=>18000 , "procent"=>10, "item"=>0, "nazwa"=>"Włóczykij");
$dane[] = array("locID"=>2 ,"myID"=>17 ,"opis"=>"", "chcica"=>5 , "chciceNeed"=> 150, "hajsMin"=>12000, "hajsMax"=>25000 , "procent"=>9, "item"=>0, "nazwa"=>"Miły Pan Policjant" );
$dane[] = array("locID"=>2 ,"myID"=>18 ,"opis"=>"", "chcica"=>4 , "chciceNeed"=> 200, "hajsMin"=>11000, "hajsMax"=>30000 , "procent"=>8, "item"=>0, "nazwa"=>"Harleyowiec Muniek W Hełmie" );
$dane[] = array("locID"=>2 ,"myID"=>19 ,"opis"=>"", "chcica"=>6 , "chciceNeed"=> 250, "hajsMin"=>14565, "hajsMax"=>36654 , "procent"=>7, "item"=>0, "nazwa"=>"Drogówka" );
$dane[] = array("locID"=>2 ,"myID"=>20 ,"opis"=>"", "chcica"=>14 , "chciceNeed"=>300 , "hajsMin"=>25000, "hajsMax"=>35000 , "procent"=>5, "item"=>1, "nazwa"=>"Jakaś Inna Tirówa" );



##CIEMNA ULICZKA 
$dane[] = array("locID"=>3 ,"myID"=>21 ,"opis"=>"", "chcica"=> 7, "chciceNeed"=>0 , "hajsMin"=>30000, "hajsMax"=>40500 , "procent"=>18, "item"=>0, "nazwa"=>"Napalony Dres" );
$dane[] = array("locID"=>3 ,"myID"=>22 ,"opis"=>"", "chcica"=> 9, "chciceNeed"=>0 , "hajsMin"=>35500, "hajsMax"=>50000 , "procent"=>16, "item"=>0, "nazwa"=>"Nieudany Gwałciciel" );
$dane[] = array("locID"=>3 ,"myID"=>23 ,"opis"=>"", "chcica"=> 10, "chciceNeed"=>0 , "hajsMin"=>37565, "hajsMax"=>53245 , "procent"=>15, "item"=>0, "nazwa"=>"Zły Chuj" );
$dane[] = array("locID"=>3 ,"myID"=>24 ,"opis"=>"", "chcica"=> 8, "chciceNeed"=>0 , "hajsMin"=>42658, "hajsMax"=>65214 , "procent"=>14, "item"=>0, "nazwa"=>"Mietek Z Bramy" );
$dane[] = array("locID"=>3 ,"myID"=>25 ,"opis"=>"", "chcica"=> 12, "chciceNeed"=>0 , "hajsMin"=>36524, "hajsMax"=>69656 , "procent"=>13, "item"=>0, "nazwa"=>"Murzyn Z Kataną" );
$dane[] = array("locID"=>3 ,"myID"=>26 ,"opis"=>"", "chcica"=> 15, "chciceNeed"=>300 , "hajsMin"=>40000, "hajsMax"=>75000 , "procent"=>12, "item"=>0, "nazwa"=>"Chuj Wie Co (Było Ciemno...)" );
$dane[] = array("locID"=>3 ,"myID"=>27 ,"opis"=>"", "chcica"=> 13, "chciceNeed"=>350 , "hajsMin"=>25000, "hajsMax"=>90550 , "procent"=>10, "item"=>0, "nazwa"=>"Lunatyk Z Ciekawymi Snami" );
$dane[] = array("locID"=>3 ,"myID"=>28 ,"opis"=>"", "chcica"=> 14, "chciceNeed"=>400 , "hajsMin"=>39565, "hajsMax"=>84658 , "procent"=>7, "item"=>0, "nazwa"=>"Przyjacielski Psychopata Józek" );
$dane[] = array("locID"=>3 ,"myID"=>29 ,"opis"=>"", "chcica"=>17 , "chciceNeed"=>440 , "hajsMin"=>54000, "hajsMax"=>70545 , "procent"=>6, "item"=>0, "nazwa"=>"Mroczny Typ" );
$dane[] = array("locID"=>3 ,"myID"=>30 ,"opis"=>"", "chcica"=>20 , "chciceNeed"=>500 , "hajsMin"=>60500, "hajsMax"=>100000 , "procent"=>5, "item"=>1, "nazwa"=>"Postrach dziwek" );



##MOTEL 
$dane[] = array("locID"=>4 ,"myID"=>31 ,"opis"=>"", "chcica"=> 13, "chciceNeed"=>0 , "hajsMin"=>45000, "hajsMax"=>85000 , "procent"=>15, "item"=>0, "nazwa"=>"Sprzątaczka" );
$dane[] = array("locID"=>4 ,"myID"=>32 ,"opis"=>"", "chcica"=> 14, "chciceNeed"=>0 , "hajsMin"=>50000, "hajsMax"=>90000 , "procent"=>14, "item"=>0, "nazwa"=>"Miażdżący Fredek" );
$dane[] = array("locID"=>4 ,"myID"=>33 ,"opis"=>"", "chcica"=> 12, "chciceNeed"=>0 , "hajsMin"=>35000, "hajsMax"=>75000 , "procent"=>13, "item"=>0, "nazwa"=>"Skrzypiący Zdzisław" );
$dane[] = array("locID"=>4 ,"myID"=>34 ,"opis"=>"", "chcica"=> 16, "chciceNeed"=>0 , "hajsMin"=>70000, "hajsMax"=>80000 , "procent"=>12, "item"=>0, "nazwa"=>"Zibi Zbieracz Złomu" );
$dane[] = array("locID"=>4 ,"myID"=>35 ,"opis"=>"", "chcica"=> 18, "chciceNeed"=>0 , "hajsMin"=>90565, "hajsMax"=>120221 , "procent"=>11, "item"=>0, "nazwa"=>"Obskurny Edek" );
$dane[] = array("locID"=>4 ,"myID"=>36 ,"opis"=>"", "chcica"=> 19, "chciceNeed"=>500 , "hajsMin"=>120000, "hajsMax"=>140000 , "procent"=>10, "item"=>0, "nazwa"=>"Jednoręki Bandyta" );
$dane[] = array("locID"=>4 ,"myID"=>37 ,"opis"=>"", "chcica"=> 15, "chciceNeed"=>600 , "hajsMin"=>110000, "hajsMax"=>160000 , "procent"=>9, "item"=>0, "nazwa"=>"Przyjezdny Frajer" );
$dane[] = array("locID"=>4 ,"myID"=>38 ,"opis"=>"", "chcica"=> 17, "chciceNeed"=>700 , "hajsMin"=>115000, "hajsMax"=>135444 , "procent"=>6, "item"=>0, "nazwa"=>"Stały Bywalec Przybytku" );
$dane[] = array("locID"=>4 ,"myID"=>39 ,"opis"=>"", "chcica"=>20 , "chciceNeed"=>750 , "hajsMin"=>150000, "hajsMax"=>190000 , "procent"=>5, "item"=>0, "nazwa"=>"Właściciel Tego Syfu" );
$dane[] = array("locID"=>4 ,"myID"=>40 ,"opis"=>"", "chcica"=>23 , "chciceNeed"=>800 , "hajsMin"=>180000, "hajsMax"=>250000 , "procent"=>4, "item"=>1, "nazwa"=>"Stado Przyjacielskich Karaluchów" );



##KIBEL 
$dane[] = array("locID"=>5 ,"myID"=>41 ,"opis"=>"", "chcica"=> 15, "chciceNeed"=>0 , "hajsMin"=>85555, "hajsMax"=> 122222, "procent"=>14, "item"=>0, "nazwa"=>"Babcia Klozetowa" );
$dane[] = array("locID"=>5 ,"myID"=>42 ,"opis"=>"", "chcica"=> 17, "chciceNeed"=>0 , "hajsMin"=>110000, "hajsMax"=>140000 , "procent"=>13, "item"=>0, "nazwa"=>"Henryk Hydraulik" );
$dane[] = array("locID"=>5 ,"myID"=>43 ,"opis"=>"", "chcica"=> 16, "chciceNeed"=>0 , "hajsMin"=>100000, "hajsMax"=>130000 , "procent"=>12, "item"=>0, "nazwa"=>"Monstrum Z Kibla" );
$dane[] = array("locID"=>5 ,"myID"=>44 ,"opis"=>"", "chcica"=> 18, "chciceNeed"=>0 , "hajsMin"=>118000, "hajsMax"=>149999 , "procent"=>11, "item"=>0, "nazwa"=>"Czyściciel Rur" );
$dane[] = array("locID"=>5 ,"myID"=>45 ,"opis"=>"", "chcica"=> 20, "chciceNeed"=>0 , "hajsMin"=>120000, "hajsMax"=>150000 , "procent"=>10, "item"=>0, "nazwa"=>"Szambonurek-Akolita" );
$dane[] = array("locID"=>5 ,"myID"=>46 ,"opis"=>"", "chcica"=> 22, "chciceNeed"=>800 , "hajsMin"=>130000, "hajsMax"=>160000 , "procent"=>7, "item"=>0, "nazwa"=>"Niebezpieczny Wąż Rzeczny" );
$dane[] = array("locID"=>5 ,"myID"=>47 ,"opis"=>"", "chcica"=> 23, "chciceNeed"=>850 , "hajsMin"=>146586, "hajsMax"=>185000 , "procent"=>6, "item"=>0, "nazwa"=>"Pirat Z Kibla" );
$dane[] = array("locID"=>5 ,"myID"=>48 ,"opis"=>"", "chcica"=> 24, "chciceNeed"=>900 , "hajsMin"=>160565, "hajsMax"=>220000 , "procent"=>5, "item"=>0, "nazwa"=>"Piszczący Barnaba" );
$dane[] = array("locID"=>5 ,"myID"=>49 ,"opis"=>"", "chcica"=>23 , "chciceNeed"=>950 , "hajsMin"=>180000, "hajsMax"=>280654 , "procent"=>4, "item"=>0, "nazwa"=>"Barrdzo Dociekliwy Inspektor Sanepidu" );
$dane[] = array("locID"=>5 ,"myID"=>50 ,"opis"=>"", "chcica"=>26 , "chciceNeed"=>1000 , "hajsMin"=>250000, "hajsMax"=>350000 , "procent"=>3, "item"=>1, "nazwa"=>"Władca Klozetu" );



##U KLIENTA 
$dane[] = array("locID"=>6 ,"myID"=>51 ,"opis"=>"", "chcica"=> 18, "chciceNeed"=>0 , "hajsMin"=>90000, "hajsMax"=>110000 , "procent"=>15, "item"=>0, "nazwa"=>"Domokrążca" );
$dane[] = array("locID"=>6 ,"myID"=>52 ,"opis"=>"", "chcica"=> 19, "chciceNeed"=>0 , "hajsMin"=>95000, "hajsMax"=>115000 , "procent"=>14, "item"=>0, "nazwa"=>"Zenon Z Mieszkania Obok" );
$dane[] = array("locID"=>6 ,"myID"=>53 ,"opis"=>"", "chcica"=> 21, "chciceNeed"=>0 , "hajsMin"=>50000, "hajsMax"=>150000 , "procent"=>13, "item"=>0, "nazwa"=>"Gościnny Zygmunt" );
$dane[] = array("locID"=>6 ,"myID"=>54 ,"opis"=>"", "chcica"=> 20, "chciceNeed"=>0 , "hajsMin"=>30000, "hajsMax"=>180000 , "procent"=>12, "item"=>0, "nazwa"=>"Energiczny Mąż" );
$dane[] = array("locID"=>6 ,"myID"=>55 ,"opis"=>"", "chcica"=> 22, "chciceNeed"=>0 , "hajsMin"=>100000, "hajsMax"=>200000 , "procent"=>11, "item"=>0, "nazwa"=>"Zdradliwy MILF" );
$dane[] = array("locID"=>6 ,"myID"=>56 ,"opis"=>"", "chcica"=> 23, "chciceNeed"=>1000 , "hajsMin"=>150000, "hajsMax"=>200000 , "procent"=>7, "item"=>0, "nazwa"=>"Skąpy Drań" );
$dane[] = array("locID"=>6 ,"myID"=>57 ,"opis"=>"", "chcica"=> 24, "chciceNeed"=>1150 , "hajsMin"=>160000, "hajsMax"=>250000 , "procent"=>6, "item"=>0, "nazwa"=>"Wesoły Romek" );
$dane[] = array("locID"=>6 ,"myID"=>58 ,"opis"=>"", "chcica"=>25 , "chciceNeed"=>1200 , "hajsMin"=>180000, "hajsMax"=>350000 , "procent"=>5, "item"=>0, "nazwa"=>"Rogacz-Mściciel" );
$dane[] = array("locID"=>6 ,"myID"=>59 ,"opis"=>"", "chcica"=>28 , "chciceNeed"=>1350 , "hajsMin"=>200000, "hajsMax"=>400000 , "procent"=>4, "item"=>0, "nazwa"=>"Pan Lucjan Ze Swoją Świnką Morską" );
$dane[] = array("locID"=>6 ,"myID"=>60 ,"opis"=>"", "chcica"=>32 , "chciceNeed"=>1400 , "hajsMin"=>350000, "hajsMax"=>500000 , "procent"=>2, "item"=>1, "nazwa"=>"Wzorowa Pani Domu" );






##HOTEL 
$dane[] = array("locID"=>7 ,"myID"=>61, "opis"=>"", "chcica"=>20 , "chciceNeed"=>0 , "hajsMin"=>100000, "hajsMax"=>200000 , "procent"=>11, "item"=>0, "nazwa"=>"Mała Pokojówka Mimi" );
$dane[] = array("locID"=>7 ,"myID"=>62, "opis"=>"", "chcica"=> 22, "chciceNeed"=>0 , "hajsMin"=>150000, "hajsMax"=>250000 , "procent"=>10, "item"=>0, "nazwa"=>"Nadziany Tłuścioch" );
$dane[] = array("locID"=>7 ,"myID"=>63, "opis"=>"", "chcica"=> 24, "chciceNeed"=>0 , "hajsMin"=>200000, "hajsMax"=>300000 , "procent"=>9, "item"=>0, "nazwa"=>"Książę O Białym Koniu" );
$dane[] = array("locID"=>7 ,"myID"=>64, "opis"=>"", "chcica"=> 26, "chciceNeed"=>0 , "hajsMin"=>250000, "hajsMax"=>350000 , "procent"=>8, "item"=>0, "nazwa"=>"Zawodowy Zbigniew" );
$dane[] = array("locID"=>7 ,"myID"=>65, "opis"=>"", "chcica"=> 28, "chciceNeed"=>0 , "hajsMin"=>300000, "hajsMax"=>400000 , "procent"=>7, "item"=>0, "nazwa"=>"Czterdziestu Rozbójników" );
$dane[] = array("locID"=>7 ,"myID"=>66, "opis"=>"", "chcica"=> 29, "chciceNeed"=>1400 , "hajsMin"=>340000, "hajsMax"=>490000 , "procent"=>6, "item"=>0, "nazwa"=>"Pan Klucznik Bartłomiej" );
$dane[] = array("locID"=>7 ,"myID"=>67, "opis"=>"", "chcica"=> 30, "chciceNeed"=>1450 , "hajsMin"=>400000, "hajsMax"=>600000 , "procent"=>5, "item"=>0, "nazwa"=>"Szybka Obsługa Hotelowa" );
$dane[] = array("locID"=>7 ,"myID"=>68, "opis"=>"", "chcica"=> 35, "chciceNeed"=>1500 , "hajsMin"=>430000, "hajsMax"=>700000 , "procent"=>4, "item"=>0, "nazwa"=>"Nieokiełznany Podróżnik" );
$dane[] = array("locID"=>7 ,"myID"=>69, "opis"=>"", "chcica"=>40 , "chciceNeed"=>1550 , "hajsMin"=>450000, "hajsMax"=>800000 , "procent"=>3, "item"=>0, "nazwa"=>"Wódz Plemienia W Delegacji" );
$dane[] = array("locID"=>7 ,"myID"=>70, "opis"=>"", "chcica"=>45 , "chciceNeed"=>1600 , "hajsMin"=>500000, "hajsMax"=>1000000 , "procent"=>2, "item"=>1, "nazwa"=>"Korpodziwka Koleżanka Po Fachu" );


#AUTO 
$dane[] = array("locID"=>8 ,"myID"=>71, "opis"=>"", "chcica"=>25 , "chciceNeed"=>0 , "hajsMin"=>300000, "hajsMax"=>420000 , "procent"=>11, "item"=>0, "nazwa"=>"Towarzysz Podróży Na Tylnym Siedzeniu Radiowozu" );
$dane[] = array("locID"=>8 ,"myID"=>72, "opis"=>"", "chcica"=>28 , "chciceNeed"=>0 , "hajsMin"=>330000, "hajsMax"=>380000 , "procent"=>10, "item"=>0, "nazwa"=>"Chyży Rajdowiec" );
$dane[] = array("locID"=>8 ,"myID"=>73, "opis"=>"", "chcica"=>30 , "chciceNeed"=>0 , "hajsMin"=>350000, "hajsMax"=>400000 , "procent"=>9, "item"=>0, "nazwa"=>"Uwalony Smarem Mechanik" );
$dane[] = array("locID"=>8 ,"myID"=>74, "opis"=>"", "chcica"=>32 , "chciceNeed"=>0 , "hajsMin"=>400000, "hajsMax"=>450000 , "procent"=>8, "item"=>0, "nazwa"=>"Ciul Z Myjni" );
$dane[] = array("locID"=>8 ,"myID"=>75, "opis"=>"", "chcica"=>34 , "chciceNeed"=>0 , "hajsMin"=>450000, "hajsMax"=>500000 , "procent"=>7, "item"=>0, "nazwa"=>"Kierowca Dłuuuuugieeegoo Tira" );
$dane[] = array("locID"=>8 ,"myID"=>76, "opis"=>"", "chcica"=>35 , "chciceNeed"=>1600 , "hajsMin"=>500000, "hajsMax"=>600000 , "procent"=>6, "item"=>0, "nazwa"=>"Dres W Maluchu" );
$dane[] = array("locID"=>8 ,"myID"=>77, "opis"=>"", "chcica"=>40 , "chciceNeed"=>1650 , "hajsMin"=>550000, "hajsMax"=>700000 , "procent"=>5, "item"=>0, "nazwa"=>"Józef Z Trabanta" );
$dane[] = array("locID"=>8 ,"myID"=>78, "opis"=>"", "chcica"=>45 , "chciceNeed"=>1700 , "hajsMin"=>600000, "hajsMax"=>800000 , "procent"=>4, "item"=>0, "nazwa"=>"Wiesiek I Jego Lamborghini" );
$dane[] = array("locID"=>8 ,"myID"=>79, "opis"=>"", "chcica"=>50 , "chciceNeed"=>1750 , "hajsMin"=>800000, "hajsMax"=>1000000 , "procent"=>3, "item"=>0, "nazwa"=>"Może Szofer Ale Z Limuzyny" );
$dane[] = array("locID"=>8 ,"myID"=>80, "opis"=>"", "chcica"=>55 , "chciceNeed"=>1800 , "hajsMin"=>1000000, "hajsMax"=>1500000 , "procent"=>2, "item"=>1,  "nazwa"=>"Nocny Taksiarz Z Promocją");


##PARK 
$dane[] = array("locID"=>9 ,"myID"=>81, "opis"=>"", "chcica"=>30 , "chciceNeed"=>30 , "hajsMin"=>550000, "hajsMax"=>650000 , "procent"=>11, "item"=>0, "nazwa"=>"Bezdomny Jałmużniarz" );
$dane[] = array("locID"=>9 ,"myID"=>82, "opis"=>"", "chcica"=>35 , "chciceNeed"=>35 , "hajsMin"=>600000, "hajsMax"=>700000 , "procent"=>10, "item"=>0, "nazwa"=>"Żul Z Krzoków" );
$dane[] = array("locID"=>9 ,"myID"=>83, "opis"=>"", "chcica"=> 40, "chciceNeed"=>40 , "hajsMin"=>700000, "hajsMax"=>800000 , "procent"=>9, "item"=>0, "nazwa"=>"Fagas Na Rolkach" );
$dane[] = array("locID"=>9 ,"myID"=>84, "opis"=>"", "chcica"=>45 , "chciceNeed"=>45 , "hajsMin"=>800000, "hajsMax"=>900000 , "procent"=>8, "item"=>0, "nazwa"=>"Nadrzewny Podglądacz" );
$dane[] = array("locID"=>9 ,"myID"=>85, "opis"=>"", "chcica"=>48 , "chciceNeed"=>48 , "hajsMin"=>900000, "hajsMax"=>1000000 , "procent"=>7, "item"=>0, "nazwa"=>"Banda Meneli" );
$dane[] = array("locID"=>9 ,"myID"=>86, "opis"=>"", "chcica"=>50 , "chciceNeed"=>50 , "hajsMin"=>1000000, "hajsMax"=>1100000 , "procent"=>6, "item"=>0, "nazwa"=>"Amator Winioków" );
$dane[] = array("locID"=>9 ,"myID"=>87, "opis"=>"", "chcica"=>55 , "chciceNeed"=>55 , "hajsMin"=>1050000, "hajsMax"=>1200000 , "procent"=>5, "item"=>0, "nazwa"=>"Zmachany Biegacz" );
$dane[] = array("locID"=>9 ,"myID"=>88, "opis"=>"", "chcica"=>60 , "chciceNeed"=>60 , "hajsMin"=>1100000, "hajsMax"=>1300000 , "procent"=>4, "item"=>0, "nazwa"=>"Melancholijny Fotograf" );
$dane[] = array("locID"=>9 ,"myID"=>89, "opis"=>"", "chcica"=>65 , "chciceNeed"=>65 , "hajsMin"=>1200000, "hajsMax"=>1500000 , "procent"=>3, "item"=>0, "nazwa"=>"Łapacz Motyli I Jego Siatka" );
$dane[] = array("locID"=>9 ,"myID"=>90, "opis"=>"", "chcica"=>70 , "chciceNeed"=>70 , "hajsMin"=>1300000, "hajsMax"=>1800000 , "procent"=>2, "item"=>1, "nazwa"=>"Uprzejmy Pan Co Śpi Na Ławce" );
/*

##KINO 
$dane[] = array("locID"=>10 ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajsMin"=>, "hajsMax"=> , "procent"=>14, "item"=>0, "nazwa"=>"Chłop pełen wrażen" );
$dane[] = array("locID"=>10 ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajsMin"=>, "hajsMax"=> , "procent"=>14, "item"=>0, "nazwa"=>"Wycieczka Szkolna" );
$dane[] = array("locID"=>10 ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajsMin"=>, "hajsMax"=> , "procent"=>14, "item"=>0, "nazwa"=>"Gość Od Popcornu" );
$dane[] = array("locID"=>10 ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajsMin"=>, "hajsMax"=> , "procent"=>14, "item"=>0, "nazwa"=>"Pełen Werwy Amator Kina Familijnego" );
$dane[] = array("locID"=>10 ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajsMin"=>, "hajsMax"=> , "procent"=>14, "item"=>0, "nazwa"=>"Potajemny Macacz");
$dane[] = array("locID"=>10 ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajsMin"=>, "hajsMax"=> , "procent"=>14, "item"=>0, "nazwa"=>"Sprzymierzeniec Ciemności" );
$dane[] = array("locID"=>10 ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajsMin"=>, "hajsMax"=> , "procent"=>14, "item"=>0, "nazwa"=>"Lord Vader" );
$dane[] = array("locID"=>10 ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajsMin"=>, "hajsMax"=> , "procent"=>14, "item"=>0, "nazwa"=>"Dowódca Kina" );
$dane[] = array("locID"=>10 ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajsMin"=>, "hajsMax"=> , "procent"=>14, "item"=>0, "nazwa"=>"Roman Sidło" );
$dane[] = array("locID"=>10 ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajsMin"=>, "hajsMax"=> , "procent"=>14, "item"=>0, "nazwa"=>"Fan S-F Z Cyberpytongiem" );


##SAMOLOT 
$dane[] = array("locID"=>11, "nazwa"=>"Szybki Wąs" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>11, "nazwa"=>"Kamikaze Wymagający „Negocjacji”" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>11, "nazwa"=>"Dzielny Spadochroniarz" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>11, "nazwa"=>"Autopilot" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>11, "nazwa"=>"Niewyżyta Stweardessa" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>11, "nazwa"=>"Latający Potwór Hentai" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>11, "nazwa"=>"Pasażer Trzeciej Klasy" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>11, "nazwa"=>"Właśiciel Linii Tani Przelot" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>11, "nazwa"=>"Przyjazny Terrorysta" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>11, "nazwa"=>"Przelotny Znajomy" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );


##ŁÓDŹ 
$dane[] = array("locID"=>12, "nazwa"=>"Parchaty Pomiot Kałamarnicy Yarr!" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>12, "nazwa"=>"Potwór Morski" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>12, "nazwa"=>"Kraken Heniek" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>12, "nazwa"=>"Mackowata Ośmiornica" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>12, "nazwa"=>"Potężny Pirat" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>12, "nazwa"=>"Straż Przybrzeżna" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>12, "nazwa"=>"Gruby Bosman" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>12, "nazwa"=>"Szorowacz Pokładu" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>12, "nazwa"=>"Pirat Z Drewnianą Pytą" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>12, "nazwa"=>"Rower Wodny" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );


##LAS 
$dane[] = array("locID"=>13, "nazwa"=>"Grzybiarz" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>13, "nazwa"=>"Leśniczy" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>13, "nazwa"=>"Dendrofil" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>13, "nazwa"=>"Dziwny Dziadyga Z Wielką Lagą" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>13, "nazwa"=>"Oswojony Rogacz" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>13, "nazwa"=>"Oszajbiały Dzik" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>13, "nazwa"=>"Pustelnik" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>13, "nazwa"=>"Bebok Z Lasu" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>13, "nazwa"=>"Rumcajs Rozbójnik" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>13, "nazwa"=>"Opętany Borsuk" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );


##PLAŻA 
$dane[] = array("locID"=>14, "nazwa"=>"Drąg znad piasku" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>14, "nazwa"=>"Ratownik" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>14, "nazwa"=>"Surfer Joe" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>14, "nazwa"=>"Bosy Leszcz" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>14, "nazwa"=>"Jur Obcisłe Majty" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>14, "nazwa"=>"Topielec" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>14, "nazwa"=>"Piaskowy Dziad" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>14, "nazwa"=>"Wężowy Wij" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>14, "nazwa"=>"Stefan W Klapkach" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>14, "nazwa"=>"Buc W Bikini" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );


##CMENTARZ 
$dane[] = array("locID"=>15, "nazwa"=>"Nekrofil" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>15, "nazwa"=>"Grabarz" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>15, "nazwa"=>"Wdowiec" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>15, "nazwa"=>"Wesoły Samobójca" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>15, "nazwa"=>"Nieumarły Henryk" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>15, "nazwa"=>"Szatanista" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>15, "nazwa"=>"Przyjazny Duch" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>15, "nazwa"=>"Sabat Metalowców" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>15, "nazwa"=>"Mroczny Goth Którego WSZYSTKO Jebie" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>15, "nazwa"=>"Mumia" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );


##PLEBANIA 
$dane[] = array("locID"=>16, "nazwa"=>"Kleryk" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>16, "nazwa"=>"Ministrant" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>16, "nazwa"=>"Wikary" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>16, "nazwa"=>"Kościelny" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>16, "nazwa"=>"Organista" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>16, "nazwa"=>"Proboszcz" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>16, "nazwa"=>"Zakonnik" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>16, "nazwa"=>"Zakonnica" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>16, "nazwa"=>"Facet z chóru" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>16, "nazwa"=>"Biskup" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );


##BIURO 
$dane[] = array("locID"=>17, "nazwa"=>"Ochroniarz" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>17, "nazwa"=>"Moczniak The Krętacz" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>17, "nazwa"=>"WiceAsystent" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>17, "nazwa"=>"Asystent" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>17, "nazwa"=>"Kierownik" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>17, "nazwa"=>"WiceDyrektor" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>17, "nazwa"=>"Dyrektor" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>17, "nazwa"=>"Sprzątacz" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>17, "nazwa"=>"Prezes" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>17, "nazwa"=>"Żona Prezesa" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );



##SEJM 
$dane[] = array("locID"=>18, "nazwa"=>"Opozycja" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>18, "nazwa"=>"Kurwiki" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>18, "nazwa"=>"Poszukiwacz Krzyża" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>18, "nazwa"=>"Hardkorowa Lewica" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>18, "nazwa"=>"Dzielny Wojownik Samoobrony" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>18, "nazwa"=>"Pan Marszałek" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>18, "nazwa"=>"Krul" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>18, "nazwa"=>"Przystojny Roman" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>18, "nazwa"=>"Delegacja Z Chin" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>18, "nazwa"=>"Partia Wyzwolenia Z Majtek" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );


##SZKOLA 
$dane[] = array("locID"=>19, "nazwa"=>"Napalony Gimbol" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>19, "nazwa"=>"Kucharz" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>19, "nazwa"=>"Nauczyciel Wfu" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>19, "nazwa"=>"Sekretarka" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>19, "nazwa"=>"Dyrektor" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>19, "nazwa"=>"Syn Dyrcia" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>19, "nazwa"=>"Woźny Zdzichu" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>19, "nazwa"=>"Pani Od Polskiego" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>19, "nazwa"=>"Nauczyciel Techniki (Ty Już Wiesz Jakiej!)" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>19, "nazwa"=>"Samorząd Uczniów" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );


##WILLA 
$dane[] = array("locID"=>20, "nazwa"=>"Odźwierny Bufford" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>20, "nazwa"=>"Pan Doktor Co Przyszedł Do Żony" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>20, "nazwa"=>"Zły Pies (Uwaga!)" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>20, "nazwa"=>"Dystyngowany Lokaj" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>20, "nazwa"=>"Gruba Gosposia Ze Zmiotką Do Kurzu" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>20, "nazwa"=>"Kanapowy Piesek Chihuahua" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>20, "nazwa"=>"Ciocia Z Ameryki" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>20, "nazwa"=>"Nawalony Kontrahent" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>20, "nazwa"=>"Przyjacielski Pan Szef Mafii" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>20, "nazwa"=>"Pan Ogrodnik I Jego Grabie" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );


##DZUNGLA 
$dane[] = array("locID"=>21, "nazwa"=>"DzikiCzłowiek" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>21, "nazwa"=>"Spocony Turysta" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>21, "nazwa"=>"Stado Murzynów" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>21, "nazwa"=>"Szaman" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>21, "nazwa"=>"Pawiany" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>21, "nazwa"=>"Leniwiec Helmut" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>21, "nazwa"=>"Wielka Stopa" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>21, "nazwa"=>"Straszliwa Bestia" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>21, "nazwa"=>"Dziki Monster" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>21, "nazwa"=>"Mrówkojad" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );

##LOCHY 
$dane[] = array("locID"=>22, "nazwa"=>"Niewolnik" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>22, "nazwa"=>"Pracownik Kotłowni" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>22, "nazwa"=>"Palacz" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>22, "nazwa"=>"Sam Cthulhu" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>22, "nazwa"=>"Wkurwiony Punisher" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>22, "nazwa"=>"Osobnik Z Długim Batogiem" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>22, "nazwa"=>"Straszliwa Domina Sado-Maso" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>22, "nazwa"=>"Mesje „Wąchaj Moje Stopy”" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>22, "nazwa"=>"Kochanica Szatana" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>22, "nazwa"=>"Nocna Nimfa" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );


##WINDA 
$dane[] = array("locID"=>23, "nazwa"=>"Elegancki Dżentelmen" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>23, "nazwa"=>"Facet z Windy" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>23, "nazwa"=>"Psychopata Co Naciska Wszystkie Guziki" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>23, "nazwa"=>"Businesswoman W Pośpiechu" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>23, "nazwa"=>"Mechanik Co Przyszedł Naprawić" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>23, "nazwa"=>"Obcy" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>23, "nazwa"=>"Przystojny Naciskacz Guziczka" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>23, "nazwa"=>"Świntuch Z Ostatniego Piętra" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>23, "nazwa"=>"Straszna Baba Z Dołu" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>23, "nazwa"=>"Czadowy Elegancik" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );

##BUTIK 
$dane[] = array("locID"=>24, "nazwa"=>"Sponsor" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>24, "nazwa"=>"Lodziarz" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>24, "nazwa"=>"Pani Sprzedawczyni" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>24, "nazwa"=>"Konkurencja Z Sąsiedniego Butika" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>24, "nazwa"=>"Sąsiadka Hania" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>24, "nazwa"=>"Klient W Poszukiwaniu Majtek Dla Żony" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>24, "nazwa"=>"Transwestyta" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>24, "nazwa"=>"Transseksualista" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>24, "nazwa"=>"Po Prostu Gej Po Torebkę" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>24, "nazwa"=>"Wąchacz Pończoszek" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );



##REJST STATKIEM 
$dane[] = array("locID"=>25, "nazwa"=>"Bogacz" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>25, "nazwa"=>"Szejk niemleczny" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>25, "nazwa"=>"Sławny Pirat Chujobrody" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>25, "nazwa"=>"Wilk Morski - Grrrr!" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>25, "nazwa"=>"Nabzdryngolona Modelka" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>25, "nazwa"=>"Wieloryb" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>25, "nazwa"=>"Syrena Henrietta" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>25, "nazwa"=>"Król Piratów" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>25, "nazwa"=>"Admirał „Spory Jacht” Grzmotowładny" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );
$dane[] = array("locID"=>25, "nazwa"=>"Tubylec Z Wyspy" ,"opis"=>, "chcica"=> , "chciceNeed"=> , "hajs"=> );




###KRAINA FETYSZU!!!
$dane[] = array("locID"=>1000000 ,"myID"=>1000000 ,"opis"=>"", "chcica"=> 10, "chciceNeed"=>0 , "hajsMin"=>0, "hajsMax"=>0 , "procent"=>3, "item"=>0, "nazwa"=>"Syfiarzowy Ruchacz" );
$dane[] = array("locID"=>1000000 ,"myID"=>1000001 ,"opis"=>"", "chcica"=> 10, "chciceNeed"=>0 , "hajsMin"=>0, "hajsMax"=>0 , "procent"=>3, "item"=>0, "nazwa"=>"Krwisty Barbarzyńca" );
$dane[] = array("locID"=>1000000 ,"myID"=>1000002 ,"opis"=>"", "chcica"=> 10, "chciceNeed"=>0 , "hajsMin"=>0, "hajsMax"=>0 , "procent"=>3, "item"=>0, "nazwa"=>"Ciążowy Burżuj" );
$dane[] = array("locID"=>1000000 ,"myID"=>1000003 ,"opis"=>"", "chcica"=> 10, "chciceNeed"=>0 , "hajsMin"=>0, "hajsMax"=>0 , "procent"=>3, "item"=>0, "nazwa"=>"Mistrz Orgii" );




mysql_query("DELETE FROM latarniaClient");
foreach($dane as $dn)
{
	mysql_query("INSERT INTO latarniaClient SET locID='".$dn['locID']."',cmyid='".$dn['myID']."', nazwa='".$dn['nazwa']."', opis='".$dn['opis']."', chcica='".$dn['chcica']."',chcicaNeed='".$dn['chciceNeed']."', hajsMin='".$dn['hajsMin']."',hajsMax='".$dn['hajsMax']."', procent='".$dn['procent']."', item='".$dn['item']."'");
	echo $dn['nazwa'].'<br>';
	
}



echo 'Connected successfully';
mysql_close($link);

*/


function findNextLevel($nextLevel)
{
	if($nextLevel < 8)
	{
		switch($nextLevel)
		{
			case 1:
				return 10;
			break;
			case 2:
				return 25;
			break;
			case 3:
				return 45;
			break;
			case 4:
				return 65;
			break;
			case 5:
				return 105;
			break;
			case 6:
				return 155;
			break;
			case 7:
				return 225;
			break;
		}		
	}
	else
	{
		$start = 225;
		$skok = 125;
		$add = 7;
		for($i = 7; $i < $nextLevel; ++$i)
		{
			$skok = $skok +$add;
			$start += $skok;

		}
		return $start;
	}
}


for($i = 6; $i < 43; ++$i)
{
	//echo $i.' : '.findNextLevel($i).'<br>';
}








