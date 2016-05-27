/**
 * Created by arielyih on 12/2/15.
 */
var screenWidth = 0, screenHeight = 0, scrollFix = false, $mask = $('.mask'), $xBtn = $('.xBtn'), hasInit = false, footerTop = 0, footerTopFix = 0, isMobile = false,
    subListHeight = [], qaHeight = [];

$(document).ready(function(){
    screenWidth = $(window).width();
    screenHeight = $(window).height();
    if ($('header').length){
        // mobile
        if (screenWidth<768){
            isMobile = true;
            mFontInit();
            mFooterInit();
            mHamburgerInit();
            mOpenHide();
        }
        else{
            headerInit();
            leftAreaListInit();
        }
    }
    if ($('.autoPlay').length) bannerInit();
    if ($('.backTop').length) backTopInit();
});

$(window).load(function(){
    var $maskWhite = $('.mask.white'), $footer = $('footer'), $main = $('#main'), footerOffset, mainOffset;
    $maskWhite.hide();
    $maskWhite.removeClass('white');
    if (isMobile){
        if ($('.proInfoList').length) mProImgPositionInit();
        if ($('#fixBottom').length){
            footerOffset = $footer.offset().top;
            mainOffset = $main.offset().top;
            footerTopFix = footerOffset-(mainOffset-$main.scrollTop())-screenHeight-0*screenWidth;
            footerTop = footerOffset-(mainOffset-$main.scrollTop())-screenHeight-0.06*screenWidth;
        }
    }
    else{
        // if index
        if ($('.top3List').length) calTop3ListHeight();
    }
});

// when pc resize width and mobile resize height
$(window).resize(function(){
    if ($('header').length){
        if (isMobile){
            var $hambuergerInfo = $('.hambuergerInfo'), $mHeadTop = $('.mHeadTop'), $mask = $('.mask');
            $hambuergerInfo.css({'height': $(window).height()-$mHeadTop.height()});
            $mask.css({'height': $(window).height()});
        }
        else{
            var $pcHeadLeft = $('.pcHeadLeft'), $pcHeadRight = $('.pcHeadRight');
            $pcHeadRight.css('width', $('.wrap').width()-$pcHeadLeft.width()-$pcHeadLeft.css('padding-left').replace('px', ''));
            $('.navHover').css('width', $('header .pc').width());
            if ($('.praiseList-big').length) praiseBigReposition();
            if ($('.praiseList-smallArea')) praiseSmallReposition();
            if ($('.invoice-text').length) setInvoiceTextWidth();
            if($(window).width()>1200){
                $('.navHover').css('left', ($(window).width()-1200)/2);
            }
            else{
                $pcHeadRight.css('width', $(window).width()-$pcHeadLeft.width()-$pcHeadLeft.css('padding-left').replace('px', '')-5);
                $('.navHover').css('left', 0);
                if ($('.table-indexBanner').length){
                    indexBannerHeightInit();
                }
            }
        }
    }
    if ($('.top3List').length) calTop3ListHeight();
});

/*************common - left area list*************/
function leftAreaListInit(){
    var $proNavList = $('.proNavList'), liCount = $proNavList.find('>ul>li').size()+1, tmpHeight = 0, liIndex = 0;
    // get sublist's height
    for (var i = 1; i<liCount; i++){
        if ($proNavList.find('>ul>li:nth-of-type('+i+')').find('.subList').length){
            tmpHeight = $proNavList.find('>ul>li:nth-of-type('+i+')').find('.subList').height();
            subListHeight.push(tmpHeight);
        }
        else{
            subListHeight.push(0);
        }
    }
    $proNavList.find('>ul>li:not(.open)').find('.subList').css({'height': 0, 'display': 'block'});
    $proNavList.find('>ul>li').click(function(){
        liIndex = $(this).index();
        if ($(this).hasClass('open')){
            $(this).removeClass('open').find('.subList').css({'margin-top': 15}).animate({'height': 0}, 500, function(){
                $(this).css({'margin-top': 0});
            });
        }
        else{
            $('.open').removeClass('open').find('.subList').animate({'height': 0}, 500, function(){
                $(this).css({'margin-top': 0});
            });
            $(this).addClass('open').find('.subList').css({'margin-top': 15}).animate({'height': subListHeight[liIndex]}, 500);
        }
    });
}

/*************common all*************/
// back to top
function backTopInit(){
    $('.backTop').click(function(){
        $('body, html').animate({
            scrollTop: 0
        }, 500);
    });
}
// banner
function bannerInit(){
    if (!isMobile){
        $('.autoPlay').slick({
            dots: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            speed: 1500,
            easing: 'ease',
            adaptiveHeight: true
        });
    }
    else{
        $('.autoPlay').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            speed: 1500,
            easing: 'ease',
            adaptiveHeight: true
        });
    }
}

// track btn click
function trackClick(){
    $('.btn.trackBtn').click(function(){
        $(this).toggleClass('trackOn');
    });
}

// amount add/minus btn click
function amountClick(){
    var amountNow = 0, $amountShow = $('.amountShow'), max = (($amountShow.attr('data-max') != undefined) ? parseInt($amountShow.attr('data-max'),10): 10);
    $('.calBtn').click(function(){
        amountNow = parseInt($amountShow.html());
        if ($(this).find('>div').hasClass('add') && amountNow < max){
            amountNow++;
        }
        else if($(this).find('>div').hasClass('minus')){
            if (amountNow != 1) amountNow--;
        }
        $amountShow.html(amountNow)
    });
}

// radio/chkbox click
function chkRadioClick(){
    $('.chkRadioBtn').click(function(){
        if ($(this).hasClass('chkBox')){
            $(this).find('.chkRadio').toggleClass('click');
        }
        else if ($(this).hasClass('radioBox') && !$(this).hasClass('chkRadioBtn-cartAddress') && !$(this).hasClass('chkRadioBtn-cartPayment')){
            $(this).parent('div').find('.chkRadio.click').removeClass('click');
            $(this).find('.chkRadio').addClass('click');
            // member modify if click 'yes', show survey form
            if ($(this).parent('.noticeArea')){
                if ($('.noticeArea-raidioYes').hasClass('click')) $('.form-survey').removeClass('hidden');
                else $('.form-survey').addClass('hidden');
            }
        }
        else if ($(this).hasClass('radioBox') && $(this).hasClass('chkRadioBtn-cartAddress')){
            $('.chkRadioBtn-cartAddress').find('.chkRadio.click').removeClass('click');
            $(this).find('.chkRadio').addClass('click');
        }
        else if ($(this).hasClass('radioBox') && $(this).hasClass('chkRadioBtn-cartPayment')){
            $('.chkRadioBtn-cartPayment').find('.chkRadio.click').removeClass('click');
            $(this).find('.chkRadio').addClass('click');
        }
        if ($(this).hasClass('radioBox-invoice2')){
            $('.td-invoice2-info').addClass('open');
            $('.td-invoice3-info').removeClass('open');
        }
        else if ($(this).hasClass('radioBox-invoice3')){
            $('.td-invoice3-info').addClass('open');
            $('.td-invoice2-info').removeClass('open');
        }
    });
}

// show mask and element
function openElementMask($element){
    $element.show();
    $mask.show().click(function(){ closeElementMask($element)});
}

// close mask and element
function closeElementMask($element){
    $mask.hide();
    $element.hide();
}

// click x btn close element and mask (if needed)
function xBtnClick($element){
    $xBtn.click(function(){
        $element.hide();
        if ($mask.css('display') == 'block') $mask.hide();
    });
}


/*************common mobile*************/
// mobile switch column display
function mProductSwitchTowColumn(){
    if (isMobile){
        $('.proInfoList.column3').removeClass('column3').addClass('column2');
        $('.proInfoList.cloumn3-margin').removeClass('cloumn3-margin').addClass('cloumn2-margin');
        $('.proInfoList.column4').removeClass('column4').addClass('column2');
        $('.column4-nomargin').removeClass('column4-nomargin').addClass('cloumn2-margin2');
    }
}

/*************pc header*************/
// pc header scroll
$(window).scroll(function(){
    var $header = $('header.pc'), $pcHeadLeft = $('.pcHeadLeft'), $pcHeadRight = $('.pcHeadRight');
    if ($(window).width()>767){
        if ($(document).scrollTop()>30 && !scrollFix){
            scrollFix = true;
            $('.navHover').removeClass('hover').removeClass('shorterHover');
            $('.navOpen').removeClass('navOpen');
            $header.addClass('scrollFix');
            $pcHeadRight.addClass('scrollFix');
            $('#topNav').addClass('scrollFix');
            $('#main').addClass('scrollFix');
            // logo fade in fade out
            $pcHeadLeft.find('.logo').stop();
            $pcHeadLeft.find('.logo').animate({
                'padding-bottom': '20%'
            }, 650);
            $pcHeadRight.find('nav').addClass('scrollFix');
            setTimeout(function(){
                $pcHeadLeft.addClass('scrollFix');
                $pcHeadRight.css('width', $('.wrap').width()-$pcHeadLeft.width()-$pcHeadLeft.css('padding-left').replace('px', ''));
                if ($(window).width()<1200){
                    $('.pcHeadRight.scrollFix').css('width', $(window).width()-$('.pcHeadLeft.scrollFix').width()-$pcHeadLeft.css('padding-left').replace('px', '')-5);
                }
            }, 100);
        }
        else if($(document).scrollTop()<=30 && scrollFix){
            setPcHeadnoFix();
        }
        if ($('#series').length){
            anchorFix();
        }
    }
});

function setPcHeadnoFix (){
    var $header = $('header.pc'), $pcHeadLeft = $('.pcHeadLeft'), $pcHeadRight = $('.pcHeadRight');
    if ($header.hasClass('scrollFix')){
        scrollFix = false;
        $header.removeClass('scrollFix');
        $pcHeadRight.removeClass('scrollFix');
        $('#topNav').removeClass('scrollFix');
        $('.navHover').removeClass('scrollFix').removeClass('hover').removeClass('shorterHover');
        $('.navOpen').removeClass('navOpen');
        $('#main').removeClass('scrollFix');
        $pcHeadRight.find('nav').removeClass('scrollFix');
        // logo fade in fade out
        $pcHeadLeft.find('.logo').stop();
        $pcHeadLeft.find('.logo').animate({
            'padding-bottom': '71%'
        }, 650);
        setTimeout(function(){
            $pcHeadLeft.removeClass('scrollFix');
            $pcHeadRight.css('width', $('.wrap').width()-$pcHeadLeft.width()-$pcHeadLeft.css('padding-left').replace('px', ''));
            if ($(window).width()<1200){
                $pcHeadRight.css('width', $(window).width()-$pcHeadLeft.width()-$pcHeadLeft.css('padding-left').replace('px', '')-5);
            }
        }, 100);
    }
}


// pc header
function headerInit(){
    var $pcHeadLeft = $('.pcHeadLeft'), $pcHeadRight = $('.pcHeadRight');
    $pcHeadRight.css('width', $('.wrap').width()-$pcHeadLeft.width()-$pcHeadLeft.css('padding-left').replace('px', ''));
    if(screenWidth>1200){
        $('.navHover').css('left', (screenWidth-1200)/2);
    }
    else{
        $pcHeadRight.css('width', $(window).width()-$pcHeadLeft.width()-$pcHeadLeft.css('padding-left').replace('px', '')-5);
    }
    if (!isMobile){
        $('.navHover').css('width', $('header .pc').width());
        pcHeadNavHover();
        chkRadioClick();
        pcMemberLoginClick();
    }
}

function pcMemberLoginClick(){
    var $pcMemberLogin = $('.memberLogin');
    $('.pcHeadRight').find('.noLogin').click(function(){
        openElementMask($pcMemberLogin);
        xBtnClick($pcMemberLogin);
    });
}

function pcHeadNavHover(){
    var $navOpen, $navHover;
    $('header.pc').find('nav').find('>ul>li').mouseenter(function(){
        $navOpen = $('.navOpen');
        $navHover = $('.navHover');
        $navOpen.removeClass('navOpen');
        if ($navHover.length){
            $navHover.removeClass('hover').removeClass('shorterHover');
        }
        $(this).find('.navHover').removeClass('hover').removeClass('shorterHover');
        $(this).addClass('navOpen');
        if ($(this).find('.navHover').hasClass('shorter')) $(this).find('.navHover').addClass('shorterHover');
        else $(this).find('.navHover').addClass('hover');
    })
        .mouseleave(function(){
            $(this).removeClass('navOpen');
            $(this).find('.navHover').removeClass('hover').removeClass('shorterHover');
        });
}

/*************mobile common*************/
// mobile font-size
function mFontInit(){
    var fontRatio = 24/640;
    $('body').css('font-size', screenWidth*fontRatio);
}

// mobile footer
function mFooterInit(){
    var $fBottomNav = $('.fBottomNav');
    $fBottomNav.find('>div:not(.fBottomCs)').click(function(){
        if (!$(this).hasClass('mOpen')){
            $('.mOpen').removeClass('mOpen');
            $(this).addClass('mOpen');
        }
        else{
            $(this).removeClass('mOpen');
        }
    });
}

// mobile hamburger
function mHamburgerInit(){
    var $hambuergerInfo = $('.hambuergerInfo'), $mHeadTop = $('.mHeadTop'), $mHeadBottom = $('.mHeadBottom');
    $hambuergerInfo.css({'height': screenHeight-$mHeadTop.height()});
    $('#hamburger').click(function(){
        $hambuergerInfo.animate({
            'left': 0
        }, 300);
        $mHeadTop.addClass('hamTopFix');
        $mHeadBottom.addClass('hamBottomFix');
        $('body').addClass('hamFixNoScroll');
        $('.wrap').addClass('hamFixNoScroll');
        $('.mask').css({'z-index': 105}).show();
    });
    $('#hamClose').click(function(){
        $hambuergerInfo.animate({
            'left': '-100%'
        }, 300);
        $mHeadTop.removeClass('hamTopFix');
        $mHeadBottom.removeClass('hamBottomFix');
        $('body').removeClass('hamFixNoScroll');
        $('.wrap').removeClass('hamFixNoScroll');
        $('.mask').css({'z-index': 900}).hide();
    });
}

// hide open
function mOpenHide(){
    $('.openHideBtn').click(function(){
        $(this).parent('.openHide').toggleClass('open');
    });
}

// reposition image in classify list
function mProImgPositionInit(){
    var $proInfoList = $('.proInfoList');
    $proInfoList.find('.proImg').find('img').each(function(){
        $(this).css('padding-top', $('.proImg').height()-$(this).height());
    });
}

// mobile btn fix bottom
function mFixBottom(){
    var scroTop = 0, $fixBottom = $('#fixBottom');
    //$(window).scroll(function(){
    //    scroTop = $(this).scrollTop();
    //    if (scroTop >= footerTop){
    //        $fixBottom.css({'position': 'absolute', 'bottom': '-11vw'});
    //    }
    //    else if(scroTop < footerTop){
    //        $fixBottom.css({'position': 'fixed', 'bottom': '0'});
    //    }
    //});

    function stickyScroll(e) {
        if( window.pageYOffset > footerTop ) {
            $fixBottom.css({'position': 'absolute', 'bottom': '-11vw'});
        }

        if( window.pageYOffset < footerTopFix) {
            $fixBottom.css({'position': 'fixed', 'bottom': '0'});
        }
    }

// Scroll handler to toggle classes.
    window.addEventListener('scroll', stickyScroll, false);
}

/*************series*************/
function seriesInit(){
    mProductSwitchTowColumn();
    anchorScroll();
}

function anchorFix(){
    var offsetTop = parseInt($('.pageTitle').offset().top-61), $anchor = $('#anchor'), left = 0,
        hotTop = parseInt($('.hotTitle>div').offset().top-105-$anchor.height());
    if (parseInt($(window).scrollTop()) < parseInt(offsetTop) || parseInt($(window).scrollTop()) >= parseInt(hotTop)){
        $anchor.removeClass('fix');
    }
    else if(parseInt($(window).scrollTop()) >= parseInt(offsetTop)){
        $anchor.addClass('fix');
        if (screenWidth>1200){
            left = (screenWidth-1200)/2;
        }
        else{
            left = 0;
        }
        $('#anchor.fix').css({'left': left, 'width': $('.leftSmall').width()});
    }
}

// anchor click and scroll
function anchorScroll(){
    var $anchor = $('#anchor'), id;
    $anchor.find('li').click(function(){
        id = '#gbcms' + $(this).attr('id');
        $('body, html').animate({
            scrollTop: $(id).offset().top-$('header').height()-10
        }, 500);
        // not scroll to top
        return false;
    });
}

/*************classify*************/
function classifyInit(){
    mProductSwitchTowColumn();
}

/*************product*************/
function productInit(){
    trackClick();
    mProductSwitchTowColumn();
    if (screenWidth<768){
        amountClick();
    }
}

/*************mobile member login*************/
function mMemberLoginInit(){
    chkRadioClick();
}

/*************member center*************/
function memberCenterInit(){
    if (screenWidth<768){
        $('.memberCenter-map.column4').removeClass('column4');
    }
}


/*************member modify*************/
function memberModifyInit(){
    if (isMobile){
        chkRadioClick();
    }
    selectCountry();
}


/*************index*************/
function indexInit(){
    top3SlickInit();
    mProductSwitchTowColumn();
    if (!isMobile){
        videoPopupInit();
    }
    else{
        mVideoInit();
    }
    indexBannerHeightInit();
}

// index banner height reset
function indexBannerHeightInit(){
    var indexBannerSize1 = $('.indexBanner-size1'), indexBannerSize2 = $('.indexBanner-size2'), indexBannerSize3 = $('.indexBanner-size3'),
        indexBannerSize4 = $('.indexBanner-size4'), s1RatioPc = 280/540, s2RatioPc = 280/330, s3RatioPc = 180/540, s4RatioPc = 180/330, s1RatioM = 310/641,
        s2RatioM = 186/641;
    if (!isMobile){
        indexBannerSize1.css('height', indexBannerSize1.width()*s1RatioPc);
        indexBannerSize2.css('height', indexBannerSize2.width()*s2RatioPc);
        indexBannerSize3.css('height', indexBannerSize3.width()*s3RatioPc);
        indexBannerSize4.css('height', indexBannerSize4.width()*s4RatioPc);
    }
    else{
        indexBannerSize1.css('height', screenWidth*s1RatioM);
        indexBannerSize2.css('height', screenWidth*s2RatioM);
    }
}

// calculate top 3 list height
function calTop3ListHeight(){
    var $top3ListInfo = $('.top3ListInfo'), height, sWidth = $(window).width();
    height = $top3ListInfo.find('li:nth-of-type(1)').height() + $top3ListInfo.find('li:nth-of-type(2)').height()
    + $top3ListInfo.find('li:nth-of-type(3)').height() + sWidth*0.128;
    $top3ListInfo.find('ul').height(height);
    $('.topList .top3ListInfo ul li').css({'margin-bottom': sWidth*0.0245});
    $top3ListInfo.find('.slick-list.draggable').css({'padding-top': sWidth*0.05});
}

function top3SlickInit(){
    $('.topSlick').slick({
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplaySpeed: 2000,
        vertical: true
    });
}

/*************register*************/
function registerInit(){
    if (isMobile){
        chkRadioClick();
    }
    selectCountry();
}

/*************order find*************/
function orderFindInit(){
    dateSelectInit();
    orderCancelClick();
}

function dateSelectInit(){
    $( ".dateSelect" ).datepicker({
        showOn: "both",
        buttonText: "日曆",
        buttonImage: "images/common/datepicker.png",
        buttonImageOnly: true
    });
}

// order cancel btn click
function orderCancelClick(){
    var $popupMessage = $('.popupMessage');
    $('.btn-order-cancel').click(function(){
        openElementMask($popupMessage);
        xBtnClick($popupMessage);
    });
}

/*************order detail*************/
function orderDetailInit(){
    setPriceHeight();
}

function setPriceHeight(){
    var index = 0;
    $('.pro-price').each(function(){
        index = $(this).index()*2+1;
        $(this).css({'height': $('.pro-name:nth-of-type('+ index +')').height()});
    });
}

/*************gift detail*************/
function giftDetailInit(){
    setPriceHeight();
}

/*************refund apply*************/
function refundApplyInit(){
    var $formRefundStyleAddress = $('.form-refundStyle-address'), $formRefundStyleCash = $('.form-refundStyle-cash');
    // for pc
    $('.chkRadioBtn').click(function(){
        if ($(this).hasClass('refund-way-cash')){
            $formRefundStyleCash.css('display', 'table-row');
        }
        else if ($(this).hasClass('refund-way-card')){
            $formRefundStyleCash.hide();
        }
    });
    // for mobile
    $('select').change(function(){
        if (this.value == 'selRefund-way-cash'){
            $formRefundStyleCash.css('display', 'table-row');
        }
        else if (this.value == 'selRefund-way-card'){
            $formRefundStyleCash.hide();
        }
    });
}

/*************gift*************/
function giftInit(){
    if (isMobile) chkRadioClick();
}

/*************cart1*************/
function cart1Init(){
    var $popupMessageDelete = $('.popupMessage-delete'), $popupMessageBonus = $('.popupMessage-bonus'), $popupMessageDiscount = $('.popupMessage-discount');
    if (isMobile){
        chkRadioClick();
        mProductSwitchTowColumn();
        mFixBottom();
    }
    // delete img click, popup message
    $('.cart-delete').click(function(){
        openElementMask($popupMessageDelete);
        xBtnClick($popupMessageDelete);
    });
    // btn bonus use click, popup message
    $('.btn-cart-bonus').click(function(){
        openElementMask($popupMessageBonus);
        xBtnClick($popupMessageBonus);
    });
    // btn discount use click, popup message
    $('.btn-cart-discount').click(function(){
        openElementMask($popupMessageDiscount);
        xBtnClick($popupMessageDiscount);
    });
}

/*************cart2*************/
function cart2Init(){
    var $chkRadioBtnCartAddress = $('.chkRadioBtn-cartAddress'), $popupMessageAddress = $('.popupMessage-address');
    setInvoiceTextWidth();
    // 常用地址
    $('.tr-hasRadioBox:not(.tr-deliverAddress)').find('.td:nth-of-type(2)').click(function(){
        $chkRadioBtnCartAddress.find('.chkRadio.click').removeClass('click');
        $(this).parent('.tr').find('.chkRadioBtn-cartAddress').find('.chkRadio').addClass('click');
    });
    // 送貨地址
    $('.tr-deliverAddress').find('.td:nth-of-type(2)').click(function(){
        $chkRadioBtnCartAddress.find('.chkRadio.click').removeClass('click');
        $('.tr-hasRadioBox.tr-deliverAddress').find('.chkRadioBtn-cartAddress').find('.chkRadio').addClass('click');
    });
    // invoice 2 click
    $('.td-indent-invoice2').find('.chkRadioBtn').click(function(){
        $('.radioBox-invoice2').find('.chkRadio').addClass('click');
        $('.radioBox-invoice3').find('.chkRadio').removeClass('click');
    });
    // delete address
    $('.deleteAddress').click(function(){
        openElementMask($popupMessageAddress);
        xBtnClick($popupMessageAddress);
    });
    selectCountry();
    if (isMobile){
        mFixBottom();
        chkRadioClick();
    }
}

// set invoice text width
function setInvoiceTextWidth(){
    var $invoice2 = $('.td-indent-invoice2');
    $('.invoice-text').css('width', $invoice2.width()-12-$invoice2.width()*0.07);
}

function selectCountry(){
    $('.select-country').find('select').change(function(){
        if (this.value == 'country-TW'){
            $(this).parent('.select-country').parent('.td').find('.select-TW').show();
        }
        else{
            $(this).parent('.select-country').parent('.td').find('.select-TW').hide();
        }
    });
}

/*************cart3*************/
function cart3Init(){
    if (isMobile){
        chkRadioClick();
        mFixBottom();
    }
}

/*************cart3*************/
function cart4Init(){
    if (isMobile){
        mFixBottom();
    }
}

/*************gift find*************/
function giftFindInit(){
    dateSelectInit();
}

/*************qa*************/
function qaInit(){
    var $qaMain = $('.qa-main'), qaCount = $qaMain.find('.qa-area').size()+1, tmpHeight = 0, index = 0;
    // get qa-a's height
    for (var i = 1; i<qaCount; i++){
        tmpHeight = $qaMain.find('.qa-area:nth-of-type('+i+')').find('.qa-a').height();
        qaHeight.push(tmpHeight);
    }
    $qaMain.find('.qa-area:not(.select)').find('.qa-a').css({'height': 0, 'display': 'none'});
    $qaMain.find('.qa-area').click(function(){
        index = $(this).index();
        if (!$(this).hasClass('select')){
            $('.select').removeClass('select').find('.qa-a').animate({'height': 0}, 300, function(){
                $(this).css({'padding-bottom': 0, 'display': 'none'});
            });
            $(this).addClass('select').find('.qa-a').css({'padding-bottom': 15, 'display': 'block'}).animate({'height': qaHeight[index]}, 300);
        }
    });
}

/*************news*************/
function newsInit(){
    var $pageTitleNews = $('.pageTitle-news-wrap');
    if (!isMobile){
        $pageTitleNews.each(function(){
           $(this).css('width', $('.pageTitle-news-h1').width() + $pageTitleNews.width()*0.07);
        });
    }
}

/*************video init*************/
function videoInit(){
    if (!isMobile){
        videoPopupInit();
    }
    else{
        mVideoInit();
    }
}

/*************public praise init*************/
function praiseListInit(){
    if (!isMobile){
        praiseBigReposition();
    }
    praiseSmallReposition();
}

function praiseBigReposition(){
    var $praiseListBigContent = $('.praiseList-big-content'), $praiseListBigImgSmall = $('.praiseList-big-imgSmall');
    $praiseListBigContent.css('padding-bottom', 73+$praiseListBigImgSmall.height());
}

function praiseSmallReposition(){
    var largeHeight = 0, $praiseListSmallArea =  $('.praiseList-smallArea'), titleLargeHeight = 0;
    $praiseListSmallArea.find('li').find('.praiseList-small-content').css('height', 'auto');
    $praiseListSmallArea.find('li')
        .find('.praiseList-small-content').each(function(){
            if ($(this).height()>largeHeight) largeHeight = $(this).height();
    })
        .find('.praise-para-title').each(function(){
            if ($(this).height()>titleLargeHeight) titleLargeHeight = $(this).height();
        });
    if (!isMobile){
        $praiseListSmallArea.find('li').css('padding-bottom', largeHeight+120-$('.praiseList-bottomStyle').height());
        $('.praiseList-small-content').height(largeHeight);
    }
    $praiseListSmallArea.find('.praise-para-title').height(titleLargeHeight);
}

/*************activity init*************/
/*
* model 1 = text on left
* model 2 = text on top
* line = number of line in this area
*/
function activityInit(){
    // lines of each activity pro area
    var num = [
        { "model": 1, "lines": 1},
        { "model": 2, "lines": 1},
        { "model": 1, "lines": 2},
        { "model": 2, "lines": 2},
        { "model": 1, "lines": 4},
        { "model": 2, "lines": 4}
    ];
    mProductSwitchTowColumn();
    // set each activity pro area's height
    //activitySetHeight(num);
    // activity popup init
    if (!isMobile) activityPopupInit();
}

/*
* totalAreaNum: total number of area
* totalLineNum: total number of line in each area
*/
function activitySetHeight(lineNum){
    var totalAreaNum = lineNum.length, index = 0, modelHeight = 0, gap = 0;
    // set every area's height
    $('.activity-proArea').each(function(){
        if (index<totalAreaNum){
            if (lineNum[index].model == 1){
                if (!isMobile){
                    modelHeight = 410; gap = 10*(lineNum[index].lines+1);
                }
                else{
                    modelHeight = 1.54*screenWidth;
                    gap = ((0.2258+0.015625)*(lineNum[index].lines-1)+0.015625*(lineNum[index].lines+1.2))*screenWidth;
                }
                $(this).height(lineNum[index].lines*modelHeight-gap);
            }
            else{
                if (!isMobile){
                    modelHeight = 510; gap = 110*(lineNum[index].lines-1);
                }
                else{
                    modelHeight = 1.67*screenWidth;
                    gap = ((0.328125+0.015625*2.8)*(lineNum[index].lines-1)+0.015625*(lineNum[index].lines+3))*screenWidth;
                }
                $(this).height(lineNum[index].lines*modelHeight-gap);
            }
        }
        index++;
    });
}

function activityPopupInit(){
    var $activityPopup = $('.activity-popup');
    $('.activity-pro-list').find('li').click(function(){
        openElementMask($activityPopup);
        xBtnClick($activityPopup);
    });
}
