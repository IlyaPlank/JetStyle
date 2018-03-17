$(function() {

	function showDataList(){
		var isLen = localStorage.length;
		if (isLen > 0) {
			for (var i = 0; i < isLen; i++) {
				var key = localStorage.key(i);
				var arrLSString = localStorage.getItem(key);
				var arrLS = arrLSString.split("-");
				var name = arrLS[0];
				var surname = arrLS[1];
				var phone = arrLS[2];
				name = name.substring(0, 1).toUpperCase() + name.substring(1);
				surname = surname.substring(0, 1).toUpperCase() + surname.substring(1);
				var initials = surname.substring(0, 1) + name.substring(0, 1).toUpperCase();
				$(".list__contacts").append("<li data-id='" + key + "'> <div class='initials'>" + initials + "</div> <div class='between'>" + surname + ' ' + name + ' ' + "<a href='tel:" + phone + "' class='tel'>" + phone + "</a> </div> <div class='btn-remove'>×</div> </li>");
			}
		}
	}
	showDataList();

	$(".btn").click(function(){

		if ($(".btn-sort").css("display") == "none") {
			$(".btn-sort").css("display", "block");
		}
		var name = $('input[name="name"]').val();
		var surname = $('input[name="surname"]').val();
		var phone = $('input[name="phone"]').val();

		if ((name == '') || (surname == '') || (phone == '')) {
			$(".error").css("opacity", "1");
			setTimeout(function(){
				$(".error").css("opacity", "0");
			}, 2000);} else {

			var nId = 0;
			$(".list__contacts").children().each(function(index, el){
				var jelId = $(el).attr("data-id");
				if (jelId > nId) 
					nId = jelId;
			});
			nId++;
			var arrAll = [name, surname, phone];
			var arrString = arrAll.join("-");
			//alert(arrString);
			localStorage.setItem(nId, arrString);
		
			name = name.substring(0, 1).toUpperCase() + name.substring(1);
			surname = surname.substring(0, 1).toUpperCase() + surname.substring(1);
			var initials = surname.substring(0, 1) + name.substring(0, 1).toUpperCase();
			//alert(name surname phone);
			//var line = "as";
			$(".list__contacts").append("<li data-id='" + nId + "'> <div class='initials'>" + initials + "</div> <div class='between'>" + surname + ' ' + name + ' ' + "<a href='tel:" + phone + "' class='tel'>" + phone + "</a> </div> <div class='btn-remove'>×</div> </li>");

			$('input[name="name"]').val('');
			$('input[name="surname"]').val('');
			$('input[name="phone"]').val('');
		}
	});

	$(".list").on("click", ".btn-remove", function () {
      $(this).parent().remove();
      if ($(".list__contacts > li").length > 0) {
			} else {
				$(".btn-sort").css("display", "none");
			}
			localStorage.removeItem($(this).parent().attr("data-id"));
   });

	$(".btn-sort").click(function(){
		var $elements = $('.list__contacts li');
    var $target = $('.list ul');
     
    $elements.sort(function (a, b) {
        var an = $(a).text(),
            bn = $(b).text();
         
        if (an && bn) {
            return an.toUpperCase().localeCompare(bn.toUpperCase());
        }
         
        return 0;
    });
     
    $elements.detach().appendTo($target);
	});

});
