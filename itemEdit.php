<meta charset="utf-8">
<script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>
<?php

$link = mysql_connect('localhost', 'root', 'moczniak92');
if (!$link) {
    die('Could not connect: ' . mysql_error());
}
mysql_select_db('mmwMobile', $link);
mysql_query("SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'", $link);





/*
$dane = mysql_query("SELECT * FROM items1 ORDER BY max1 DESC");


$decr['kosmetyki'] = 50;
$decr['odziez'] = 50;
$decr['bizuteria'] = 50;
$decr['obuwie'] = 50;
$decr['dodatki'] = 50;
$decr['bielizna'] = 50;
$decr['zabawki'] = 50;


while($ds = mysql_fetch_assoc($dane))
{
	
	mysql_query("UPDATE items1 SET image_src='assets/images/items/".$ds['typ1']."/".$ds['typ1'].$decr[$ds['typ1']].".png' WHERE itemID='".$ds['itemID']."'");
	$decr[$ds['typ1']]--;
}
*/

if($_GET['save'] == 1)
{
	mysql_query("UPDATE items1 SET nazwa='".$_GET['nazwa']."' WHERE itemID='".$_GET['itemID']."'");
	echo 'ok';
}
else
{ 

$dane = mysql_query("SELECT * FROM items1 ORDER BY typ1 DESC");
while($ds = mysql_fetch_assoc($dane))
{
	
	echo '<img src="'.$ds['image_src'].'" style="vertical-align:middle;"> : '.$ds['typ1'].' <input type="text" class="nazwa" id="'.$ds['itemID'].'" value="'.$ds['nazwa'].'"><button class="save" id="'.$ds['itemID'].'">zapisz</button><span class="finish" id="'.$ds['itemID'].'"></span><br>';
	
	
}


?>
<script>
$('.save').click(function(){
	var ids = this.id;
	
	var nazwa = $('#'+ids+'.nazwa').val();
		$.ajax({
			method: "GET",
			url: "itemEdit.php?save=1&itemID="+ids+'&nazwa='+nazwa
		}).done(function() {
		  $('#'+ids+'.finish').html("zapisano");
		});
});


</script>
<? }?>