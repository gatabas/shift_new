<script language="JavaScript" type="text/javascript">
<!--
function hesapla() {
    var kilo = document.KitleForm.kilo.value
    var boy = document.KitleForm.boy.value
    if(kilo > 0 && boy > 0){
        var sonuc = kilo/(boy/100*boy/100)
        document.KitleForm.endeks.value = sonuc
        if(sonuc < 18.5){
            document.KitleForm.islemsonucu.value = "Zayýfsýnýz"
        }
        if(sonuc > 18.5 && sonuc < 25){
            document.KitleForm.islemsonucu.value = "Gayet Saðlýklý."
        }
        if(sonuc > 25){
            document.KitleForm.islemsonucu.value = "Þiþmansýnýz."
        }
    }
    else{
        alert("Böyle kilo, boy olmaz tekrar dene")
    }
}
//-->
</script>