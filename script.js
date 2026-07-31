/* =========================================================
   TRANSLATION DICTIONARY
   To add new translatable content later:
   1. Add data-i18n="your_key" to the HTML element
      (or data-i18n-placeholder="your_key" for inputs)
   2. Add "your_key" with a value under EACH of the 4
      language blocks below.
   That's it — the switching logic never needs to change.
========================================================= */
const translations = {
  en: {
    nav_home:"Home", nav_about:"About Us", nav_products:"Products", nav_contact:"Contact",
    hero_eyebrow:"EST. IN MALAYSIA",
    hero_title_1:"Stones cut", hero_title_2:"from honesty",
    hero_subtitle:"Every gem AJ Gemstones sells is sourced, graded, and priced in the open — no inflated certificates, no guesswork, just the stone in front of you.",
    hero_cta:"View the Collection", hero_scroll:"Scroll",
    about_eyebrow:"WHO WE ARE", about_title:"Three generations of stone people",
    about_p1:"AJ Gemstones started as a single loupe and a notebook of supplier contacts across Sri Lanka, Colombia, and Myanmar. Today we still buy the same way — in person, stone by stone — because a gem's story matters as much as its cut.",
    about_p2:"We're not a mall counter. Every piece that reaches our shelf has passed through the same three hands: the buyer, the appraiser, and the founder. If we wouldn't gift it to family, we don't sell it.",
    stat1_num:"27", stat1_label:"Years sourcing stones",
    stat2_num:"1,400+", stat2_label:"Certified gems sold",
    stat3_num:"9", stat3_label:"Countries of origin",
    products_eyebrow:"08 STONES, ONE STANDARD", products_title:"The Collection",
    products_subtitle:"Prices reflect the stone alone — no setting, no markup theatre. Ask us about custom mounting for any piece.",
    prod1_name:"Ceylon Blue Sapphire", prod1_origin:"Origin: Sri Lanka", prod1_desc:"Cornflower-blue and untreated, the kind of sapphire that made Ceylon famous.",
    prod2_name:"Colombian Emerald", prod2_origin:"Origin: Colombia", prod2_desc:"Deep jungle-green with the classic jardin inclusions collectors look for.",
    prod3_name:"Burmese Pigeon-Blood Ruby", prod3_origin:"Origin: Myanmar", prod3_desc:"The rarest red in the trade — vivid, fluorescent, and genuinely scarce.",
    prod4_name:"Tanzanite", prod4_origin:"Origin: Tanzania", prod4_desc:"Violet-blue and found in exactly one place on Earth.",
    prod5_name:"Alexandrite", prod5_origin:"Origin: Mozambique", prod5_desc:"Green in daylight, red under warm light — a colour-change stone rarer than diamond.",
    prod6_name:"Brazilian Amethyst", prod6_origin:"Origin: Brazil", prod6_desc:"Rich purple with excellent clarity, cut for maximum brilliance.",
    prod7_name:"Madagascar Citrine", prod7_origin:"Origin: Madagascar", prod7_desc:"Warm honey-gold, a quietly confident everyday stone.",
    prod8_name:"Santa Maria Aquamarine", prod8_origin:"Origin: Brazil", prod8_desc:"Named for the mine that produces the purest blue aquamarine known.",
    btn_enquire:"Enquire",
    contact_eyebrow:"GET IN TOUCH", contact_title:"Ask before you buy",
    contact_subtitle:"Send us the stone you're curious about — we reply with sourcing notes, certification, and honest pricing.",
    form_name_label:"Name", form_email_label:"Email", form_message_label:"Message",
    form_placeholder_name:"Your full name", form_placeholder_email:"you@email.com", form_placeholder_message:"Tell us which stone caught your eye...",
    form_submit:"Send Message", form_success:"Thank you — we'll reply within one business day.",
    footer_tagline:"Rare stones, plainly priced.", footer_links_title:"Explore", footer_contact_title:"Visit Us",
    footer_address:"Jalan Sultan Ismail, Kuala Lumpur, Malaysia", footer_hours:"Tue–Sun, 11am – 7pm",
    footer_copyright:"© 2026 AJ Gemstones. All rights reserved.",
    toast_enquire:"Thanks for your interest in"
  },
  ms: {
    nav_home:"Laman Utama", nav_about:"Tentang Kami", nav_products:"Produk", nav_contact:"Hubungi",
    hero_eyebrow:"DITUBUHKAN DI MALAYSIA",
    hero_title_1:"Batu permata dipotong", hero_title_2:"dengan kejujuran",
    hero_subtitle:"Setiap permata yang dijual oleh AJ Gemstones disumber, dinilai, dan diberi harga secara telus — tiada sijil digembar-gemburkan, tiada tekaan, hanya batu yang ada di hadapan anda.",
    hero_cta:"Lihat Koleksi", hero_scroll:"Tatal",
    about_eyebrow:"SIAPA KAMI", about_title:"Tiga generasi insan permata",
    about_p1:"AJ Gemstones bermula dengan sebuah loupe dan buku nota kenalan pembekal di Sri Lanka, Colombia, dan Myanmar. Hari ini kami masih membeli dengan cara yang sama — secara peribadi, batu demi batu — kerana kisah sesebuah permata sama pentingnya dengan potongannya.",
    about_p2:"Kami bukan kaunter pusat membeli-belah. Setiap permata yang sampai ke rak kami telah melalui tiga tangan yang sama: pembeli, penilai, dan pengasas. Jika kami tidak sanggup menghadiahkannya kepada keluarga sendiri, kami tidak menjualnya.",
    stat1_num:"27", stat1_label:"Tahun mencari permata",
    stat2_num:"1,400+", stat2_label:"Permata bersijil terjual",
    stat3_num:"9", stat3_label:"Negara sumber",
    products_eyebrow:"08 PERMATA, SATU STANDARD", products_title:"Koleksi",
    products_subtitle:"Harga mencerminkan batu itu sahaja — tiada tetapan, tiada lakonan markup. Tanya kami tentang tetapan tersuai untuk mana-mana permata.",
    prod1_name:"Nilam Biru Ceylon", prod1_origin:"Asal: Sri Lanka", prod1_desc:"Biru cornflower dan tidak dirawat, jenis nilam yang mengharumkan nama Ceylon.",
    prod2_name:"Zamrud Colombia", prod2_origin:"Asal: Colombia", prod2_desc:"Hijau hutan yang mendalam dengan inklusi jardin klasik yang dicari kolektor.",
    prod3_name:"Delima Darah Merpati Burma", prod3_origin:"Asal: Myanmar", prod3_desc:"Merah paling jarang dalam perdagangan — terang, berpendaflour, dan benar-benar terhad.",
    prod4_name:"Tanzanite", prod4_origin:"Asal: Tanzania", prod4_desc:"Ungu-biru dan hanya ditemui di satu tempat sahaja di dunia.",
    prod5_name:"Aleksandrit", prod5_origin:"Asal: Mozambique", prod5_desc:"Hijau pada waktu siang, merah di bawah cahaya suam — batu penukar warna yang lebih jarang daripada berlian.",
    prod6_name:"Kecubung Brazil", prod6_origin:"Asal: Brazil", prod6_desc:"Ungu pekat dengan kejernihan cemerlang, dipotong untuk kilauan maksimum.",
    prod7_name:"Sitrin Madagascar", prod7_origin:"Asal: Madagascar", prod7_desc:"Emas madu yang hangat, permata harian yang tenang namun yakin.",
    prod8_name:"Akuamarin Santa Maria", prod8_origin:"Asal: Brazil", prod8_desc:"Dinamakan sempena lombong yang menghasilkan akuamarin biru paling tulen.",
    btn_enquire:"Bertanya",
    contact_eyebrow:"HUBUNGI KAMI", contact_title:"Tanya sebelum membeli",
    contact_subtitle:"Hantarkan kepada kami permata yang menarik minat anda — kami akan membalas dengan nota sumber, sijil, dan harga yang jujur.",
    form_name_label:"Nama", form_email_label:"Emel", form_message_label:"Mesej",
    form_placeholder_name:"Nama penuh anda", form_placeholder_email:"anda@emel.com", form_placeholder_message:"Beritahu kami permata yang menarik perhatian anda...",
    form_submit:"Hantar Mesej", form_success:"Terima kasih — kami akan membalas dalam masa satu hari bekerja.",
    footer_tagline:"Permata jarang, harga jelas.", footer_links_title:"Terokai", footer_contact_title:"Lawati Kami",
    footer_address:"Jalan Sultan Ismail, Kuala Lumpur, Malaysia", footer_hours:"Sel–Ahad, 11 pagi – 7 malam",
    footer_copyright:"© 2026 AJ Gemstones. Hak cipta terpelihara.",
    toast_enquire:"Terima kasih atas minat anda terhadap"
  },
  zh: {
    nav_home:"首页", nav_about:"关于我们", nav_products:"产品", nav_contact:"联系我们",
    hero_eyebrow:"创立于马来西亚",
    hero_title_1:"诚信", hero_title_2:"雕琢每一颗宝石",
    hero_subtitle:"AJ Gemstones 出售的每一颗宝石都经过公开的采购、鉴定和定价——没有虚高的证书，没有猜测，只有您眼前真实的石头。",
    hero_cta:"查看收藏", hero_scroll:"向下滚动",
    about_eyebrow:"关于我们", about_title:"三代宝石世家",
    about_p1:"AJ Gemstones 起步时只有一支放大镜和一本记录斯里兰卡、哥伦比亚和缅甸供应商联系方式的笔记本。如今我们依然采用同样的方式采购——亲自挑选，一颗一颗地看——因为宝石的故事和切工同样重要。",
    about_p2:"我们不是商场柜台。每一件上架的宝石都经过同样的三双手:采购人、鉴定师和创始人。如果我们不愿意送给家人，就不会卖给您。",
    stat1_num:"27", stat1_label:"采购宝石的年数",
    stat2_num:"1,400+", stat2_label:"已售出的认证宝石",
    stat3_num:"9", stat3_label:"原产国数量",
    products_eyebrow:"8 款宝石，同一标准", products_title:"宝石收藏",
    products_subtitle:"价格仅反映宝石本身——不含镶嵌费用，没有虚假加价。如需定制镶嵌，请联系我们。",
    prod1_name:"锡兰蓝宝石", prod1_origin:"产地：斯里兰卡", prod1_desc:"矢车菊蓝、未经处理，正是让锡兰蓝宝石闻名于世的那种蓝宝石。",
    prod2_name:"哥伦比亚祖母绿", prod2_origin:"产地：哥伦比亚", prod2_desc:"深邃的丛林绿，带有藏家钟爱的经典花园状内含物。",
    prod3_name:"缅甸鸽血红宝石", prod3_origin:"产地：缅甸", prod3_desc:"业内最稀有的红色宝石——鲜艳、带荧光、真正稀少。",
    prod4_name:"坦桑石", prod4_origin:"产地：坦桑尼亚", prod4_desc:"紫蓝色调，全球仅产自一处地方。",
    prod5_name:"亚历山大变石", prod5_origin:"产地：莫桑比克", prod5_desc:"日光下呈绿色，暖光下呈红色——比钻石更稀有的变色宝石。",
    prod6_name:"巴西紫水晶", prod6_origin:"产地：巴西", prod6_desc:"浓郁的紫色，净度极佳，切工力求最大光彩。",
    prod7_name:"马达加斯加黄水晶", prod7_origin:"产地：马达加斯加", prod7_desc:"温暖的蜜糖金色，低调而自信的日常宝石。",
    prod8_name:"圣玛丽亚海蓝宝", prod8_origin:"产地：巴西", prod8_desc:"以出产最纯净蓝色海蓝宝石的矿场命名。",
    btn_enquire:"询价",
    contact_eyebrow:"联系方式", contact_title:"购买前先咨询",
    contact_subtitle:"把您感兴趣的宝石告诉我们——我们会回复采购说明、鉴定证书和诚实的价格。",
    form_name_label:"姓名", form_email_label:"电子邮箱", form_message_label:"留言",
    form_placeholder_name:"您的全名", form_placeholder_email:"you@email.com", form_placeholder_message:"告诉我们哪颗宝石吸引了您……",
    form_submit:"发送留言", form_success:"谢谢您——我们将在一个工作日内回复。",
    footer_tagline:"稀有宝石，明码标价。", footer_links_title:"浏览", footer_contact_title:"欢迎光临",
    footer_address:"Jalan Sultan Ismail, 吉隆坡, 马来西亚", footer_hours:"周二至周日，上午11点至晚上7点",
    footer_copyright:"© 2026 AJ Gemstones. 版权所有。",
    toast_enquire:"感谢您对以下宝石的关注："
  },
  ta: {
    nav_home:"முகப்பு", nav_about:"எங்களை பற்றி", nav_products:"தயாரிப்புகள்", nav_contact:"தொடர்பு",
    hero_eyebrow:"மலேசியாவில் நிறுவப்பட்டது",
    hero_title_1:"நேர்மையால்", hero_title_2:"வெட்டப்பட்ட கற்கள்",
    hero_subtitle:"AJ Gemstones விற்கும் ஒவ்வொரு ரத்தினமும் வெளிப்படையாக பெறப்பட்டு, மதிப்பீடு செய்யப்பட்டு, விலை நிர்ணயிக்கப்படுகிறது — மிகைப்படுத்தப்பட்ட சான்றிதழ்கள் இல்லை, ஊகங்கள் இல்லை, உங்கள் முன் இருக்கும் கல் மட்டுமே.",
    hero_cta:"தொகுப்பைக் காண்க", hero_scroll:"கீழே உருட்டவும்",
    about_eyebrow:"நாங்கள் யார்", about_title:"மூன்று தலைமுறை ரத்தின மக்கள்",
    about_p1:"AJ Gemstones ஒரு பூதக்கண்ணாடி மற்றும் இலங்கை, கொலம்பியா, மியான்மார் ஆகிய நாடுகளின் வழங்குநர் தொடர்புகளின் குறிப்பேட்டுடன் தொடங்கியது. இன்றும் நாங்கள் அதே முறையில் வாங்குகிறோம் — நேரடியாக, ஒவ்வொரு கல்லாகவும் — ஏனெனில் ஒரு ரத்தினத்தின் கதை அதன் வெட்டு போலவே முக்கியமானது.",
    about_p2:"நாங்கள் ஒரு மால் கவுண்டர் அல்ல. எங்கள் அலமாரியை அடையும் ஒவ்வொரு பொருளும் ஒரே மூன்று கைகளை கடந்து வருகிறது: வாங்குபவர், மதிப்பீட்டாளர், நிறுவனர். எங்கள் குடும்பத்திற்கு பரிசாக கொடுக்க தயங்கும் ஒன்றை நாங்கள் விற்க மாட்டோம்.",
    stat1_num:"27", stat1_label:"கற்களை தேடிய ஆண்டுகள்",
    stat2_num:"1,400+", stat2_label:"விற்கப்பட்ட சான்றளிக்கப்பட்ட ரத்தினங்கள்",
    stat3_num:"9", stat3_label:"மூல நாடுகள்",
    products_eyebrow:"08 கற்கள், ஒரே தரம்", products_title:"தொகுப்பு",
    products_subtitle:"விலைகள் கல்லை மட்டுமே பிரதிபலிக்கின்றன — செட்டிங் இல்லை, மிகைப்படுத்தல் இல்லை. எந்த கல்லுக்கும் தனிப்பயன் செட்டிங் பற்றி எங்களிடம் கேளுங்கள்.",
    prod1_name:"சிலோன் நீல நீலமணி", prod1_origin:"மூலம்: இலங்கை", prod1_desc:"கார்ன்ஃப்ளவர் நீலம், சிகிச்சை செய்யப்படாதது — சிலோனை புகழ் பெறச் செய்த நீலமணி வகை.",
    prod2_name:"கொலம்பிய மரகதம்", prod2_origin:"மூலம்: கொலம்பியா", prod2_desc:"ஆழமான காடு-பச்சை நிறம், சேகரிப்பாளர்கள் விரும்பும் கிளாசிக் ஜார்டின் உள்ளடக்கங்களுடன்.",
    prod3_name:"பர்மிய புறா-இரத்த மாணிக்கம்", prod3_origin:"மூலம்: மியான்மார்", prod3_desc:"வர்த்தகத்தில் அரிதான சிவப்பு — தெளிவான, ஒளிரும், உண்மையிலேயே அரிதானது.",
    prod4_name:"தான்சனைட்", prod4_origin:"மூலம்: தான்சானியா", prod4_desc:"ஊதா-நீலம், பூமியில் ஒரே ஒரு இடத்தில் மட்டுமே கிடைக்கிறது.",
    prod5_name:"அலெக்ஸாண்ட்ரைட்", prod5_origin:"மூலம்: மொசாம்பிக்", prod5_desc:"பகலில் பச்சை, வெதுவெதுப்பான வெளிச்சத்தில் சிவப்பு — வைரத்தை விட அரிதான நிறமாற்று கல்.",
    prod6_name:"பிரேசிலிய அமெதிஸ்ட்", prod6_origin:"மூலம்: பிரேசில்", prod6_desc:"அடர் ஊதா நிறம், சிறந்த தெளிவுடன், அதிகபட்ச பிரகாசத்திற்காக வெட்டப்பட்டது.",
    prod7_name:"மடகாஸ்கர் சிட்ரின்", prod7_origin:"மூலம்: மடகாஸ்கர்", prod7_desc:"சூடான தேன்-தங்க நிறம், அமைதியான நம்பிக்கையுள்ள அன்றாட கல்.",
    prod8_name:"சாண்டா மரியா அக்வாமரின்", prod8_origin:"மூலம்: பிரேசில்", prod8_desc:"மிகத் தூய்மையான நீல அக்வாமரின் தரும் சுரங்கத்தின் பெயரால் அழைக்கப்படுகிறது.",
    btn_enquire:"விசாரிக்க",
    contact_eyebrow:"தொடர்பு கொள்ளுங்கள்", contact_title:"வாங்குவதற்கு முன் கேளுங்கள்",
    contact_subtitle:"உங்களை ஈர்த்த கல்லை எங்களுக்கு அனுப்புங்கள் — நாங்கள் மூல தகவல், சான்றிதழ், நேர்மையான விலையுடன் பதிலளிப்போம்.",
    form_name_label:"பெயர்", form_email_label:"மின்னஞ்சல்", form_message_label:"செய்தி",
    form_placeholder_name:"உங்கள் முழு பெயர்", form_placeholder_email:"you@email.com", form_placeholder_message:"உங்களை ஈர்த்த கல் எது என்று சொல்லுங்கள்...",
    form_submit:"செய்தி அனுப்பு", form_success:"நன்றி — ஒரு வேலை நாளில் பதிலளிப்போம்.",
    footer_tagline:"அரிய கற்கள், தெளிவான விலை.", footer_links_title:"ஆராயுங்கள்", footer_contact_title:"எங்களை பார்வையிடுங்கள்",
    footer_address:"ஜாலான் சுல்தான் இஸ்மாயில், கோலாலம்பூர், மலேசியா", footer_hours:"செவ்வாய்–ஞாயிறு, காலை 11 – இரவு 7",
    footer_copyright:"© 2026 AJ Gemstones. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
    toast_enquire:"உங்கள் ஆர்வத்திற்கு நன்றி:"
  }
};

let currentLang = localStorage.getItem('aj_lang') || 'en';

function applyLanguage(lang){
  if(!translations[lang]) lang = 'en';
  currentLang = lang;
  document.documentElement.lang = lang;
  localStorage.setItem('aj_lang', lang);

  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    if(translations[lang][key] !== undefined){
      el.textContent = translations[lang][key];
    } else if(translations.en[key] !== undefined){
      el.textContent = translations.en[key]; // graceful fallback for new/untranslated keys
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
    const key = el.getAttribute('data-i18n-placeholder');
    if(translations[lang][key] !== undefined){
      el.setAttribute('placeholder', translations[lang][key]);
    } else if(translations.en[key] !== undefined){
      el.setAttribute('placeholder', translations.en[key]);
    }
  });

  document.getElementById('langCurrent').textContent = lang.toUpperCase();
  document.querySelectorAll('.lang-menu button').forEach(b=>{
    b.classList.toggle('active', b.getAttribute('data-lang') === lang);
  });
}

// language dropdown interactions
const langSwitch = document.getElementById('langSwitch');
const langBtn = document.getElementById('langBtn');
langBtn.addEventListener('click', (e)=>{
  e.stopPropagation();
  const open = langSwitch.classList.toggle('open');
  langBtn.setAttribute('aria-expanded', open);
});
document.querySelectorAll('.lang-menu button').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    applyLanguage(btn.getAttribute('data-lang'));
    langSwitch.classList.remove('open');
    langBtn.setAttribute('aria-expanded','false');
  });
});
document.addEventListener('click', (e)=>{
  if(!langSwitch.contains(e.target)) langSwitch.classList.remove('open');
});

// mobile nav
const burger = document.getElementById('burgerBtn');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', ()=>{
  const open = navLinks.classList.toggle('open');
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a=>{
  a.addEventListener('click', ()=>{
    navLinks.classList.remove('open');
    burger.classList.remove('open');
  });
});

// sticky header + active nav link
const header = document.getElementById('siteHeader');
const sections = document.querySelectorAll('main section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', ()=>{
  header.classList.toggle('scrolled', window.scrollY > 40);

  let current = '';
  sections.forEach(sec=>{
    const top = sec.offsetTop - 140;
    if(window.scrollY >= top) current = sec.id;
  });
  navAnchors.forEach(a=>{
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}, { passive:true });

// scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold:0.15 });
revealEls.forEach(el=> io.observe(el));

// contact form
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
contactForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  formNote.textContent = translations[currentLang].form_success || translations.en.form_success;
  contactForm.reset();
});

// enquire buttons -> scroll to contact + prefill message + toast
function enquireAbout(stoneName){
  document.getElementById('cMessage').value =
    (translations[currentLang].form_placeholder_message ? '' : '') + stoneName;
  document.getElementById('contact').scrollIntoView({ behavior:'smooth' });
  showToast((translations[currentLang].toast_enquire || translations.en.toast_enquire) + ' ' + stoneName);
}

const toastEl = document.getElementById('toast');
let toastTimer;
function showToast(msg){
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> toastEl.classList.remove('show'), 3200);
}

// init
applyLanguage(currentLang);
