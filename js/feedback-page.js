/**
 * Created by Leo on 16/8/12.
 */
/**
 * Created by Leo on 16/8/12.
 */
(function(mui, window, document, undefined,$) {
    mui.init();
    var get = function(id) {
        return document.getElementById(id);
    };
    var qsa = function(sel) {
        return [].slice.call(document.querySelectorAll(sel));
    };
    var ui = {
        imageList: get('image-list'),
        submit: get('submit')
    };
    ui.clearForm = function() {
        ui.question.value = '';
        ui.contact.value = '';
        ui.imageList.innerHTML = '';
        ui.newPlaceholder();
    };
    ui.getFileInputArray = function() {
        return [].slice.call(ui.imageList.querySelectorAll('input[type="file"]'));
    };
    ui.getFileInputIdArray = function() {
        var fileInputArray = ui.getFileInputArray();
        var idArray = [];
        fileInputArray.forEach(function(fileInput) {
            if (fileInput.value != '') {
                idArray.push(fileInput.getAttribute('id'));
            }
        });
        return idArray;
    };
    var imageIndexIdNum = 0;
    ui.newPlaceholder = function() {
        var fileInputArray = ui.getFileInputArray();
        if (fileInputArray &&
            fileInputArray.length > 0 &&
            fileInputArray[fileInputArray.length - 1].parentNode.classList.contains('space')) {
            return;
        }
        imageIndexIdNum++;
        var placeholder = document.createElement('div');
        placeholder.setAttribute('class', 'image-item space');
        var closeButton = document.createElement('div');
        closeButton.setAttribute('class', 'image-close');
        closeButton.innerHTML = 'X';
        closeButton.addEventListener('click', function(event) {
            event.stopPropagation();
            event.cancelBubble = true;
            setTimeout(function() {
                ui.imageList.removeChild(placeholder);
            }, 0);
            return false;
        }, false);
        var fileInput = document.createElement('input');
        fileInput.setAttribute('type', 'file');
        fileInput.setAttribute('accept', 'image/*');
        fileInput.setAttribute('id', 'image-' + imageIndexIdNum);
        fileInput.addEventListener('change', function(event) {
            var file = fileInput.files[0];
            var goodsid = $(this).parents('li').data('goodsid');
            if (file) {
                var reader = new FileReader();
                reader.onload = function() {
                    //处理 android 4.1 兼容问题
                    var base64 = reader.result.split(',')[1];
                    var dataUrl = 'data:image/png;base64,' + base64;
                    placeholder.style.backgroundImage = 'url(' + dataUrl + ')';
                    placeholder.setAttribute('data-src',base64);
                }
                reader.readAsDataURL(file);
                placeholder.classList.remove('space');
                ui.newPlaceholder();
            }
        }, false);
        placeholder.appendChild(closeButton);
        placeholder.appendChild(fileInput);
        ui.imageList.appendChild(placeholder);
    };
    ui.newPlaceholder();
    //提交的方法
    ui.submit.addEventListener('tap', function(event) {
    	var textareainfo = $('#textarea').val();
    	var goodsid = $('.cm-list>li').data('goodsid');
    	var checkedbox = $('.mui-control-content input:checked').data('');
    	var ArrayImg = [].slice.call($('#image-list>.image-item:not(.space)'));
      	var UrlImg = [];
    	ArrayImg.forEach(function(box){
			UrlImg.push(box.dataset.src);
    	});
    	console.log(ArrayImg);
//  	var WaiArray = [].slice.call($('.cm-list>li'));
//  	var UrlImg = [];
//  	WaiArray.forEach(function(waibox){
//			var neiArray = [].slice.call(waibox.querySelectorAll('#image-list>.image-item:not(.space)'));
//			neiArray.forEach(function(neibox){
//				UrlImg.push(waibox.dataset.goodsid+'-'+''+'-'+neibox.dataset.src);
//			});
//  	});
	}, false);
})(mui, window, document, undefined,Zepto);