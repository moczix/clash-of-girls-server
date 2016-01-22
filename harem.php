    <meta charset="utf-8">
<?php

$link = mysql_connect('localhost', 'root', 'moczniak92');
if (!$link) {
    die('Could not connect: ' . mysql_error());
}
mysql_select_db('mmwMobile', $link);
mysql_query("SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'", $link);

$harem[] = array("haremID"=>1 ,"val"=>1, "hajs"=>100, "cena"=>1000 , "lvl"=>5,"typ1"=>"kosmetyki", "nazwa"=>"Tani Ania");
$harem[] = array("haremID"=>2 ,"val"=>1, "hajs"=>100, "cena"=>1000 , "lvl"=>5,"typ1"=>"odziez", "nazwa"=>"Danusia Dupusia");
$harem[] = array("haremID"=>3 ,"val"=>1, "hajs"=>100, "cena"=>1000 , "lvl"=>5,"typ1"=>"bizuteria", "nazwa"=>"Mleczna Helga");
$harem[] = array("haremID"=>4 ,"val"=>1, "hajs"=>100, "cena"=>1000 , "lvl"=>5,"typ1"=>"obuwie", "nazwa"=>"Cycata Cecylia");
$harem[] = array("haremID"=>5 ,"val"=>1, "hajs"=>100, "cena"=>1000 , "lvl"=>5,"typ1"=>"dodatki", "nazwa"=>"Agnieszka CoSsałaOrzeszka");
$harem[] = array("haremID"=>6 ,"val"=>1, "hajs"=>100, "cena"=>1000 , "lvl"=>5,"typ1"=>"bielizna", "nazwa"=>"Szybka Samanta");
$harem[] = array("haremID"=>7 ,"val"=>1, "hajs"=>100, "cena"=>1000 , "lvl"=>5,"typ1"=>"zabawki", "nazwa"=>"Ola CoMaWora");

$harem[] = array("haremID"=>8 ,"val"=>3, "hajs"=>1000, "cena"=>7500 , "lvl"=>10,"typ1"=>"kosmetyki", "nazwa"=>"Edytka Transwestytka");
$harem[] = array("haremID"=>9 ,"val"=>3, "hajs"=>1000, "cena"=>7500 , "lvl"=>10,"typ1"=>"odziez", "nazwa"=>"Anal Lisa");
$harem[] = array("haremID"=>10 ,"val"=>3, "hajs"=>1000, "cena"=>7500 , "lvl"=>10,"typ1"=>"bizuteria", "nazwa"=>"Córka proboszcza");
$harem[] = array("haremID"=>11 ,"val"=>3, "hajs"=>1000, "cena"=>7500 , "lvl"=>10,"typ1"=>"obuwie", "nazwa"=>"Lola z pornola");
$harem[] = array("haremID"=>12 ,"val"=>3, "hajs"=>1000, "cena"=>7500 , "lvl"=>10,"typ1"=>"dodatki", "nazwa"=>"Liza-wieta");
$harem[] = array("haremID"=>13 ,"val"=>3, "hajs"=>1000, "cena"=>7500 , "lvl"=>10,"typ1"=>"bielizna", "nazwa"=>"Analityczna");
$harem[] = array("haremID"=>14 ,"val"=>3, "hajs"=>1000, "cena"=>7500 , "lvl"=>10,"typ1"=>"zabawki", "nazwa"=>"Tania Frania");

$harem[] = array("haremID"=>15 ,"val"=>7, "hajs"=>5000, "cena"=>50000 , "lvl"=>15,"typ1"=>"kosmetyki", "nazwa"=>"Zassana Ania");
$harem[] = array("haremID"=>16 ,"val"=>7, "hajs"=>5000, "cena"=>50000 , "lvl"=>15,"typ1"=>"odziez", "nazwa"=>"Jolanta Palanta");
$harem[] = array("haremID"=>17 ,"val"=>7, "hajs"=>5000, "cena"=>50000 , "lvl"=>15,"typ1"=>"bizuteria", "nazwa"=>"Natka Wariatka");
$harem[] = array("haremID"=>18 ,"val"=>7, "hajs"=>5000, "cena"=>50000 , "lvl"=>15,"typ1"=>"obuwie", "nazwa"=>"Cycata Smarkata");
$harem[] = array("haremID"=>19 ,"val"=>7, "hajs"=>5000, "cena"=>50000 , "lvl"=>15,"typ1"=>"dodatki", "nazwa"=>"Ciasna Viola");
$harem[] = array("haremID"=>20 ,"val"=>7, "hajs"=>5000, "cena"=>50000 , "lvl"=>15,"typ1"=>"bielizna", "nazwa"=>"Wilgotna Ola");
$harem[] = array("haremID"=>21 ,"val"=>7, "hajs"=>5000, "cena"=>50000 , "lvl"=>15,"typ1"=>"zabawki", "nazwa"=>"Szczerbata Małolata");

$harem[] = array("haremID"=>22 ,"val"=>10, "hajs"=>15000, "cena"=>250000 , "lvl"=>20,"typ1"=>"kosmetyki", "nazwa"=>"Połykaczka mieczy");
$harem[] = array("haremID"=>23 ,"val"=>10, "hajs"=>15000, "cena"=>250000 , "lvl"=>20,"typ1"=>"odziez", "nazwa"=>"Kakaowa Zosia");
$harem[] = array("haremID"=>24 ,"val"=>10, "hajs"=>15000, "cena"=>250000 , "lvl"=>20,"typ1"=>"bizuteria", "nazwa"=>"Drapaczka Jadźka");
$harem[] = array("haremID"=>25 ,"val"=>10, "hajs"=>15000, "cena"=>250000 , "lvl"=>20,"typ1"=>"obuwie", "nazwa"=>"Deska Tereska");
$harem[] = array("haremID"=>26 ,"val"=>10, "hajs"=>15000, "cena"=>250000 , "lvl"=>20,"typ1"=>"dodatki", "nazwa"=>"Poranna Marianna");
$harem[] = array("haremID"=>27 ,"val"=>10, "hajs"=>15000, "cena"=>250000 , "lvl"=>20,"typ1"=>"bielizna", "nazwa"=>"Zosia Samosia");
$harem[] = array("haremID"=>28 ,"val"=>10, "hajs"=>15000, "cena"=>250000 , "lvl"=>20,"typ1"=>"zabawki", "nazwa"=>"Poskramiaczka węży");

$harem[] = array("haremID"=>29 ,"val"=>13, "hajs"=>25000, "cena"=>350000 , "lvl"=>25,"typ1"=>"kosmetyki", "nazwa"=>"Samanta imigranta");
$harem[] = array("haremID"=>30 ,"val"=>13, "hajs"=>25000, "cena"=>350000 , "lvl"=>25,"typ1"=>"odziez", "nazwa"=>"Basia mini kutasa");
$harem[] = array("haremID"=>31 ,"val"=>13, "hajs"=>25000, "cena"=>350000 , "lvl"=>25,"typ1"=>"bizuteria", "nazwa"=>"Moczka Żona Porażona");
$harem[] = array("haremID"=>32 ,"val"=>13, "hajs"=>25000, "cena"=>350000 , "lvl"=>25,"typ1"=>"obuwie", "nazwa"=>"Matrona Fantoma");
$harem[] = array("haremID"=>33 ,"val"=>13, "hajs"=>25000, "cena"=>350000 , "lvl"=>25,"typ1"=>"dodatki", "nazwa"=>"Bożena Biznesmena");
$harem[] = array("haremID"=>34 ,"val"=>13, "hajs"=>25000, "cena"=>350000 , "lvl"=>25,"typ1"=>"bielizna", "nazwa"=>"Roszczeniowa Mahabka");
$harem[] = array("haremID"=>35 ,"val"=>13, "hajs"=>25000, "cena"=>350000 , "lvl"=>25,"typ1"=>"zabawki", "nazwa"=>"Cwana Conchita");

$harem[] = array("haremID"=>36 ,"val"=>15, "hajs"=>50000, "cena"=>500000 , "lvl"=>30,"typ1"=>"kosmetyki", "nazwa"=>"Rejczel");
$harem[] = array("haremID"=>37 ,"val"=>15, "hajs"=>50000, "cena"=>500000 , "lvl"=>30,"typ1"=>"odziez", "nazwa"=>"TrissMerigold");
$harem[] = array("haremID"=>38 ,"val"=>15, "hajs"=>50000, "cena"=>500000 , "lvl"=>30,"typ1"=>"bizuteria", "nazwa"=>"diablica666");
$harem[] = array("haremID"=>39 ,"val"=>15, "hajs"=>50000, "cena"=>500000 , "lvl"=>30,"typ1"=>"obuwie", "nazwa"=>"RybkaCipka");
$harem[] = array("haremID"=>40 ,"val"=>15, "hajs"=>50000, "cena"=>500000 , "lvl"=>30,"typ1"=>"dodatki", "nazwa"=>"Gorzka Czekolada");
$harem[] = array("haremID"=>41 ,"val"=>15, "hajs"=>50000, "cena"=>500000 , "lvl"=>30,"typ1"=>"bielizna", "nazwa"=>"Wyzwolona Księgowa");
$harem[] = array("haremID"=>42 ,"val"=>15, "hajs"=>50000, "cena"=>500000 , "lvl"=>30,"typ1"=>"zabawki", "nazwa"=>"NataliaZróbMiDobrze");

$harem[] = array("haremID"=>43 ,"val"=>30, "hajs"=>100000, "cena"=>1000000 , "lvl"=>40,"typ1"=>"kosmetyki", "nazwa"=>"SexyLexie");
$harem[] = array("haremID"=>44 ,"val"=>30, "hajs"=>100000, "cena"=>1000000 , "lvl"=>40,"typ1"=>"odziez", "nazwa"=>"Nielegalna Dupodajka");
$harem[] = array("haremID"=>45 ,"val"=>30, "hajs"=>100000, "cena"=>1000000 , "lvl"=>40,"typ1"=>"bizuteria", "nazwa"=>"Cwana Cindy");
$harem[] = array("haremID"=>46 ,"val"=>30, "hajs"=>100000, "cena"=>1000000 , "lvl"=>40,"typ1"=>"obuwie", "nazwa"=>"Cichodajka");
$harem[] = array("haremID"=>47 ,"val"=>30, "hajs"=>100000, "cena"=>1000000 , "lvl"=>40,"typ1"=>"dodatki", "nazwa"=>"Puszysta Myszka");
$harem[] = array("haremID"=>48 ,"val"=>30, "hajs"=>100000, "cena"=>1000000 , "lvl"=>40,"typ1"=>"bielizna", "nazwa"=>"Bezpańska Suka");
$harem[] = array("haremID"=>49 ,"val"=>30, "hajs"=>100000, "cena"=>1000000 , "lvl"=>40,"typ1"=>"zabawki", "nazwa"=>"Dominatorka");

$harem[] = array("haremID"=>50 ,"val"=>50, "hajs"=>200000, "cena"=>5000000 , "lvl"=>50,"typ1"=>"kosmetyki", "nazwa"=>"MokraWara");
$harem[] = array("haremID"=>51 ,"val"=>50, "hajs"=>200000, "cena"=>5000000 , "lvl"=>50,"typ1"=>"odziez", "nazwa"=>"BladaDupa");
$harem[] = array("haremID"=>52 ,"val"=>50, "hajs"=>200000, "cena"=>5000000 , "lvl"=>50,"typ1"=>"bizuteria", "nazwa"=>"NapalonaLucynka69");
$harem[] = array("haremID"=>53 ,"val"=>50, "hajs"=>200000, "cena"=>5000000 , "lvl"=>50,"typ1"=>"obuwie", "nazwa"=>"NapalonaOla");
$harem[] = array("haremID"=>54 ,"val"=>50, "hajs"=>200000, "cena"=>5000000 , "lvl"=>50,"typ1"=>"dodatki", "nazwa"=>"DzikaLoszka");
$harem[] = array("haremID"=>55 ,"val"=>50, "hajs"=>200000, "cena"=>5000000 , "lvl"=>50,"typ1"=>"bielizna", "nazwa"=>"SzalonaRuda");
$harem[] = array("haremID"=>56 ,"val"=>50, "hajs"=>200000, "cena"=>5000000 , "lvl"=>50,"typ1"=>"zabawki", "nazwa"=>"ZimnaCzika");

$harem[] = array("haremID"=>57 ,"val"=>70, "hajs"=>600000, "cena"=>20000000 , "lvl"=>60,"typ1"=>"kosmetyki", "nazwa"=>"Puszczalska Czekolada");
$harem[] = array("haremID"=>58 ,"val"=>70, "hajs"=>600000, "cena"=>20000000 , "lvl"=>60,"typ1"=>"odziez", "nazwa"=>"Srakospijaczka");
$harem[] = array("haremID"=>59 ,"val"=>70, "hajs"=>600000, "cena"=>20000000 , "lvl"=>60,"typ1"=>"bizuteria", "nazwa"=>"OstraBicz");
$harem[] = array("haremID"=>60 ,"val"=>70, "hajs"=>600000, "cena"=>20000000 , "lvl"=>60,"typ1"=>"obuwie", "nazwa"=>"MokraSzparkaSzatana");
$harem[] = array("haremID"=>61 ,"val"=>70, "hajs"=>600000, "cena"=>20000000 , "lvl"=>60,"typ1"=>"dodatki", "nazwa"=>"Przebiegła Dzikuska");
$harem[] = array("haremID"=>62 ,"val"=>70, "hajs"=>600000, "cena"=>20000000 , "lvl"=>60,"typ1"=>"bielizna", "nazwa"=>"Luksusowa Monika");
$harem[] = array("haremID"=>63 ,"val"=>70, "hajs"=>600000, "cena"=>20000000 , "lvl"=>60,"typ1"=>"zabawki", "nazwa"=>"Lodziara");

$harem[] = array("haremID"=>64 ,"val"=>100, "hajs"=>1000000, "cena"=>100000000 , "lvl"=>70,"typ1"=>"kosmetyki", "nazwa"=>"");
$harem[] = array("haremID"=>65 ,"val"=>100, "hajs"=>1000000, "cena"=>100000000 , "lvl"=>70,"typ1"=>"odziez", "nazwa"=>"");
$harem[] = array("haremID"=>66 ,"val"=>100, "hajs"=>1000000, "cena"=>100000000 , "lvl"=>70,"typ1"=>"bizuteria", "nazwa"=>"");
$harem[] = array("haremID"=>67 ,"val"=>100, "hajs"=>1000000, "cena"=>100000000 , "lvl"=>70,"typ1"=>"obuwie", "nazwa"=>"");
$harem[] = array("haremID"=>68 ,"val"=>100, "hajs"=>1000000, "cena"=>100000000 , "lvl"=>70,"typ1"=>"dodatki", "nazwa"=>"");
$harem[] = array("haremID"=>69 ,"val"=>100, "hajs"=>1000000, "cena"=>100000000 , "lvl"=>70,"typ1"=>"bielizna", "nazwa"=>"");
$harem[] = array("haremID"=>70 ,"val"=>100, "hajs"=>1000000, "cena"=>100000000 , "lvl"=>70,"typ1"=>"zabawki", "nazwa"=>"");

$harem[] = array("haremID"=>71 ,"val"=>130, "hajs"=>3000000, "cena"=>300000000 , "lvl"=>80,"typ1"=>"kosmetyki", "nazwa"=>"Zwykła Dupeczka");
$harem[] = array("haremID"=>72 ,"val"=>130, "hajs"=>3000000, "cena"=>300000000 , "lvl"=>80,"typ1"=>"odziez", "nazwa"=>"GorącaSucz");
$harem[] = array("haremID"=>73 ,"val"=>130, "hajs"=>3000000, "cena"=>300000000 , "lvl"=>80,"typ1"=>"bizuteria", "nazwa"=>"GłośnaDajka");
$harem[] = array("haremID"=>74 ,"val"=>130, "hajs"=>3000000, "cena"=>300000000 , "lvl"=>80,"typ1"=>"obuwie", "nazwa"=>"IgaSukiada");
$harem[] = array("haremID"=>75 ,"val"=>130, "hajs"=>3000000, "cena"=>300000000 , "lvl"=>80,"typ1"=>"dodatki", "nazwa"=>"MartwaKasia");
$harem[] = array("haremID"=>76 ,"val"=>130, "hajs"=>3000000, "cena"=>300000000 , "lvl"=>80,"typ1"=>"bielizna", "nazwa"=>"Mia Cipodajka");
$harem[] = array("haremID"=>77 ,"val"=>130, "hajs"=>3000000, "cena"=>300000000 , "lvl"=>80,"typ1"=>"zabawki", "nazwa"=>"Mokra Szarlotka");

$harem[] = array("haremID"=>78 ,"val"=>150, "hajs"=>5000000, "cena"=>500000000 , "lvl"=>90,"typ1"=>"kosmetyki", "nazwa"=>"Namiętna Muszelka");
$harem[] = array("haremID"=>79 ,"val"=>150, "hajs"=>5000000, "cena"=>500000000 , "lvl"=>90,"typ1"=>"odziez", "nazwa"=>"Śmietankowa 18stka");
$harem[] = array("haremID"=>80 ,"val"=>150, "hajs"=>5000000, "cena"=>500000000 , "lvl"=>90,"typ1"=>"bizuteria", "nazwa"=>"OnaLubiSsać");
$harem[] = array("haremID"=>81 ,"val"=>150, "hajs"=>5000000, "cena"=>500000000 , "lvl"=>90,"typ1"=>"obuwie", "nazwa"=>"Grzybiara");
$harem[] = array("haremID"=>82 ,"val"=>150, "hajs"=>5000000, "cena"=>500000000 , "lvl"=>90,"typ1"=>"dodatki", "nazwa"=>"SsieJakOdkurzacz");
$harem[] = array("haremID"=>83 ,"val"=>150, "hajs"=>5000000, "cena"=>500000000 , "lvl"=>90,"typ1"=>"bielizna", "nazwa"=>"");
$harem[] = array("haremID"=>84 ,"val"=>150, "hajs"=>5000000, "cena"=>500000000 , "lvl"=>90,"typ1"=>"zabawki", "nazwa"=>"");

$harem[] = array("haremID"=>85 ,"val"=>180, "hajs"=>10000000, "cena"=>1000000000 , "lvl"=>100,"typ1"=>"kosmetyki", "nazwa"=>"");
$harem[] = array("haremID"=>86 ,"val"=>180, "hajs"=>10000000, "cena"=>1000000000 , "lvl"=>100,"typ1"=>"odziez", "nazwa"=>"");
$harem[] = array("haremID"=>87 ,"val"=>180, "hajs"=>10000000, "cena"=>1000000000 , "lvl"=>100,"typ1"=>"bizuteria", "nazwa"=>"");
$harem[] = array("haremID"=>88 ,"val"=>180, "hajs"=>10000000, "cena"=>1000000000 , "lvl"=>100,"typ1"=>"obuwie", "nazwa"=>"");
$harem[] = array("haremID"=>89 ,"val"=>180, "hajs"=>10000000, "cena"=>1000000000 , "lvl"=>100,"typ1"=>"dodatki", "nazwa"=>"");
$harem[] = array("haremID"=>90 ,"val"=>180, "hajs"=>10000000, "cena"=>1000000000 , "lvl"=>100,"typ1"=>"bielizna", "nazwa"=>"");
$harem[] = array("haremID"=>91 ,"val"=>180, "hajs"=>10000000, "cena"=>1000000000 , "lvl"=>100,"typ1"=>"zabawki", "nazwa"=>"");


mysql_query("DELETE FROM harem");

foreach($harem as $hr)
{
	mysql_query("INSERT INTO harem SET haremID='".$hr['haremID']."', val='".$hr['val']."', hajs='".$hr['hajs']."', cena='".$hr['cena']."', lvl='".$hr['lvl']."', typ1='".$hr['typ1']."', nazwa_pl='".$hr['nazwa']."'");
	
	
}
