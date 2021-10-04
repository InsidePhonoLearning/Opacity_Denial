//Software based on Carolyn Anderson's ComicCaption Ibex software.
//Preload images using Alex Drummond's Preloader controller.
//All bugs, errors, and stylistic faux pas can be attributed to Brandon Prickett.

//**************************************
// INITIALIZE VARIABLES AND FUNCTIONS
//***************************************

//Conditions:
var lang = "F";
var suff = "1";

//Other params:
var train_block_num = 1; //Should be 5 in real exp.
var test_block_num = 1; //Should be 5 in real exp.
var test_run = false; //Should be false in real exp.
    
//Generic function to shuffle arrays:
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
   
     
//List of images for stems:
var pic_names = [];
var jpgs = ["2.jpg", "4.jpg", "23.jpg", "24.jpg", "6.jpg", "9.jpg", "10.jpg", "18.jpg", "20.jpg", "25.jpg", "26.jpg", "27.jpg", "28.jpg", "32.jpg", "33.jpg", "34.jpg", "35.jpg", "36.jpg", "37.jpg", "39.jpg", "41.jpg", "42.jpg", "45.jpg", "48.jpg", "49.jpg", "50.jpg", "52.jpg", "55.jpg", "59.jpg", "62.jpg", "65.jpg", "72.jpg", "73.jpg", "76.jpg", "79.jpg", "81.jpg", "84.jpg", "86.jpg", "87.jpg", "88.jpg", "90.jpg", "92.jpg", "93.jpg", "94.jpg", "97.jpg", "107.jpg", "109.jpg", "121.jpg", "125.jpg", "127.jpg", "130.jpg", "132.jpg", "134.jpg", "135.jpg", "137.jpg", "138.jpg", "139.jpg", "140.jpg", "142.jpg", "143.jpg", "145.jpg", "148.jpg", "149.jpg", "154.jpg", "160.jpg", "161.jpg", "166.jpg", "168.jpg", "173.jpg", "174.jpg", "178.jpg", "183.jpg", "185.jpg", "187.jpg", "189.jpg", "190.jpg", "191.jpg", "192.jpg", "196.jpg", "197.jpg", "198.jpg", "199.jpg", "221.jpg", "224.jpg", "229.jpg", "232.jpg", "234.jpg", "237.jpg", "238.jpg"]; 
var pic_dir = "https://people.umass.edu/bprickett/Opacity_Denial/Visual/";
for (i = 1; i <= 200; i ++){
    this_pic = i+".jpg";
    if (jpgs.includes(this_pic)){
        pic_names.push(this_pic);
    }
    else{
        pic_names.push(i+".png"); 
    }
}

shuffle(pic_names);
var IMAGES_TO_PRELOAD = [];
for (i = 0; i < pic_names.length; i ++){
    IMAGES_TO_PRELOAD.push(pic_dir.concat(pic_names[i]));
}
    
//Images for instructions:
IMAGES_TO_PRELOAD.push("https://people.umass.edu/bprickett/Opacity_Denial/cat plus front example.png");
IMAGES_TO_PRELOAD.push("https://people.umass.edu/bprickett/Opacity_Denial/cat plus below example.png");
IMAGES_TO_PRELOAD.push("https://people.umass.edu/bprickett/Opacity_Denial/equals cats example.png");
IMAGES_TO_PRELOAD.push("https://people.umass.edu/bprickett/Opacity_Denial/outlined_square.jpg");
IMAGES_TO_PRELOAD.push("https://people.umass.edu/bprickett/Opacity_Denial/arrow.png");
IMAGES_TO_PRELOAD.push("https://people.umass.edu/bprickett/Opacity_Denial/X_pic.png");
IMAGES_TO_PRELOAD.push("https://people.umass.edu/bprickett/Opacity_Denial/Check_Pic.png");

//Images for practice questions:
IMAGES_TO_PRELOAD.push("https://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/cat.png");
IMAGES_TO_PRELOAD.push("https://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/brick.png");
IMAGES_TO_PRELOAD.push("https://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/hoof.png");
IMAGES_TO_PRELOAD.push("https://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/leaf.png");
IMAGES_TO_PRELOAD.push("https://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.png");
IMAGES_TO_PRELOAD.push("https://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/bag.png");

//**************************************
// BUILD TRAINING TRIALS
//***************************************
//Suffixes:
//1: ft, b, sk
//2: ???

//General data to keep track of:    
var audio_dir = "https://people.umass.edu/bprickett/Opacity_Denial/Language=".concat(lang).concat("_Suffixes=").concat(suff).concat("/");
var ur_dir = "https://people.umass.edu/bprickett/Opacity_Denial/Suffix_URs/";
if (suff == "1"){
        withheld_ending = "sk";
       if (lang == "F" || lang == "CF"){
           suff2vowel = {"ft":"e", "b":"o", "sk":"o"};
       }
       else {
           suff2vowel = {"ft":"e", "b":"o", "sk":"e"};   
       }
    }
else {
        suff2vowel = {}; //Need to figure this out
        withheld_ending = "v";
    }
function get_suffDict(L) {
    var suffix_dict = { //This is a way to look up a suffix based on what condition and trial type you're in.
        "1": {
            "Train": {
                "FaithNoHarm": ["ft", "b","ft", "b","ft", "b"],
                "FaithNoPal": ["b", "b","b", "b","b", "b"],
                "Harm": ["ft", "b","ft", "b","ft", "b"],
                "Pal": ["ft","ft","ft","ft","ft","ft"]
            },
            "Test":  {
                "Harm_newAff": ["sk", "sk"],
                "FaithNoHarm": ["ft", "b"],
                "FaithNoPal": ["b", "b"],
                "Harm": ["ft", "b"],
                "Pal": ["ft","ft"]
            }
        },  
        
        "2": {
            "Train": {
                "FaithNoHarm": [],
                "FaithNoPal": [],
                "Harm": [],
                //"Inter": ["B", "F"],
                "Pal": []
            },
            "Test":  {
                "Harm_newAff": [],
                //"Inter_newAff": ["K"],
                //"Inter_newType": ["D", "P"],
            }
        }  
    };

    //Since interacting differs across languages, deal with that here:
    if (L == "F" || L == "CF"){
            suffix_dict["1"]["Train"]["Inter"] = ["b", "b","b", "b","b", "b"];
            suffix_dict["1"]["Test"]["Inter"] = ["b", "b"];
            suffix_dict["1"]["Test"]["Inter_newAff"] = ["sk", "sk"];
            suffix_dict["1"]["Test"]["Inter_newType"] = ["ft", "ft", "ft", "ft"];
            //suffix_dict["2"]["Train"]["Inter"] = ["sk", "ft","sk", "ft"];
            //suffix_dict["2"]["Test"]["Inter_newAff"] = ["v", "v", "v", "v", "v"];
            //suffix_dict["2"]["Test"]["Inter_newType"] = ["Z", "b", "Z", "b", "Z", "b", "Z", "b", "Z", "b"];       
            };
    if (L == "B" || L == "CB"){

            };

    return suffix_dict;
}


//Create a mapping between the meaning labels used here and their English equivalent:
var meaningToEnglish = {"L":"to the left of", "R":"to the right of", "T":"above", "B":"below", "F":"in front of"};
  
//Create suffix->meaning mapping for this participant:
var suffix_to_meaning = {};
var meaning_to_suffix = {};
//var meanings = ["T", "B", "F"];
//var other_means = ["L", "R"];
var meanings = ["F"]
var other_means = ["L", "R"]
var meaning_string = "";
shuffle(other_means);
var withheld_mean = other_means[0];
meanings.push(other_means[1]);
shuffle(meanings);
if (suff == "1"){
    raw_suffs = ["ft", "b"];
    var all_suffs = raw_suffs.concat(["sk"]);
    shuffle(raw_suffs);
    for (var i=0; i < raw_suffs.length; i++){
          suffix_to_meaning[raw_suffs[i]] = meanings[i];
          meaning_to_suffix[meanings[i]] = raw_suffs[i];
          meaning_string = meaning_string + raw_suffs[i]+"->"+meanings[i]+";";
    }
    suffix_to_meaning["sk"] = withheld_mean;
    meaning_to_suffix[withheld_mean] = "sk";
    meaning_string = meaning_string + "SK->"+withheld_mean+";";
}
if (suff == "2") {
  //Need to change instructions so that they inlcude other meanings (if you're using top or bottom)!!!
}

//Meaning-to-image mappings:
function get_m2i (image){
    var partial_html1 = "<img src='".concat(image).concat("'>");
    var arrow_src = "https://people.umass.edu/bprickett/Opacity_Denial/arrow.png";
    meaning2image = {
                    "L":"<table align='center'><tr><td></td><td></td><td></td><td></td></tr><tr><td></td><td><img style='width:100px;height:100px;' src='".concat(arrow_src).concat("'><td>").concat(partial_html1).concat("</td></tr><tr><td></td><td></td><td></td><td></td></tr></table>"),
                    "R":"<table align='center'><tr><td></td><td></td><td></td><td></td></tr><tr><td></td><td>".concat(partial_html1).concat("</td><td><img style='width:100px;height:100px;' src='").concat(arrow_src).concat("'></td></tr><tr><td></td><td></td><td></td><td></td></tr></table>"),
                    "B":"<table align='center'><tr><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td>".concat(partial_html1).concat("<td></td></tr><tr><td></td><td></td><td><img style='width:100px;height:100px;' src='").concat(arrow_src).concat("'></td><td></td></tr></table>"),
                    "T":"<table align='center'><tr><td></td><td></td><td><img style='width:100px;height:100px;' src='".concat(arrow_src).concat("'></td><td></td></tr><tr><td></td><td></td>").concat(partial_html1).concat("<td></td></tr><tr><td></td><td></td><td></td></tr></table>"),
                    "F":"<table align='center'><tr><td></td><td></td><td>".concat("<div style='border:0; position:relative;'><img id='stim' style='border:0; position:relative; top: 10px; left: 10px; z-index: 1;' src='").concat(image).concat("'><img id='arrow' style='border:0; position:absolute; top: 50px; left: 50px; z-index: 2;width:100px;height:100px;' src='").concat(arrow_src).concat("'></div>").concat("</td></tr></table>"),
                    "plural":"<table align='center'><tr><td></td><td></td><td></td><td></td></tr><tr><td></td><td>".concat(partial_html1).concat("</td><td></td></tr><tr><td></td><td>").concat(partial_html1).concat("</td><td></td><td></td></tr></table>"),
    };
    return meaning2image;
}

//HTML to use for audio playing:
var player_function_1 = "<script>function audioEndPreA() {a = document.getElementById('a_image');a.style.border = 'solid red 10px';document.getElementById('a_player').play();}";
var player_function_2 = "function audioEndPostA() {a = document.getElementById('a_image');a.style.borderStyle = 'none';document.getElementById('sil_2').play();}";
var player_function_3 = "function audioEndPreB() {b = document.getElementById('b_image');b.style.border = 'solid red 10px'; b.style.padding = '40px'; document.getElementById('b_player').play();}";
var player_function_4 = "function audioEndPostB() {b = document.getElementById('b_image'); b.style.borderStyle = 'none'; b.style.padding = '50px'; }";
var player_function_5 = "function audioStartSR() {c = document.getElementById('sr_image');c.style.border = 'solid red 10px'; c.style.padding = '40px';}";
var player_function_6 = "function audioEndSR() {c = document.getElementById('sr_image');c.style.borderStyle = 'none'; c.style.padding = '50px';}</script>";
var player_functions = player_function_1.concat(player_function_2).concat(player_function_3).concat(player_function_4).concat(player_function_5).concat(player_function_6);

var stem_silence = "<audio style='visibility:hidden;' id='sil_stem' controls autoplay onended='audioStartStem()'><source src='https://people.umass.edu/bprickett/Opacity_Denial/shorter_silence.wav'></audio>";
var silence_one = "<audio style='visibility:hidden;' id='sil_1' controls autoplay onended='audioEndPreA()'><source src='https://people.umass.edu/bprickett/Opacity_Denial/shorter_silence.wav'></audio>";
var silence_two = "<audio style='visibility:hidden;' id='sil_2' controls onended='audioEndPreB()'><source src='https://people.umass.edu/bprickett/Opacity_Denial/shorter_silence.wav'></audio>";
 
var all_audio = "<audio style='visibility:hidden;' controls preload='auto'><source src='https://people.umass.edu/bprickett/Opacity_Denial/shorter_silence.wav'></audio>";

//Add the suffix ur files to the "all_audio" string for preloading:
all_suffix_files = ['1_eft_right.wav', '1_eft_wrong.wav', '1_esk_withheld.wav', '1_isk_withheld.wav', '1_iv_right.wav', '1_iv_wrong.wav', '1_ob_right.wav', '1_ob_wrong.wav', '1_osk_withheld.wav', '1_usk_withheld.wav', '1_uZ_right.wav', '1_uZ_wrong.wav', '2_eb_right.wav', '2_eb_wrong.wav', '2_iv_withheld.wav', '2_iZ_right.wav', '2_iZ_wrong.wav', '2_oft_right.wav', '2_oft_wrong.wav', '2_usk_right.wav', '2_usk_wrong.wav', '2_uv_withheld.wav'];
for (sf = 0; sf < all_suffix_files.length; sf++){
    this_file = all_suffix_files[sf];
    full_src = ur_dir.concat(this_file);
    all_audio = all_audio + "<audio style='visibility:hidden;' controls preload='auto'><source src='"+full_src+"'></audio>"
}
    
//Arrays to build:
var train_items = [];
var break_pages = [];
var train_names = []; 
var i = 0;
var stem_num_tracker = {"Train":{"FaithNoHarm":{}, "FaithNoPal":{}, "Harm":{}, "Pal":{}, "Inter":{}}, "Test":{"Harm_newAff":{}, "Inter_newAff":{}, "Inter_newType":{}, "FaithNoHarm":{}, "FaithNoPal":{}, "Harm":{}, "Pal":{}, "Inter":{}}};
for (phase in stem_num_tracker){
    for (tt in stem_num_tracker[phase]){
        for (var s_i = 0; s_i < all_suffs.length; s_i ++){
                s = all_suffs[s_i]
                stem_num_tracker[phase][tt][s] = 0;
            }
        }
    }

//Block for each suffix:
var suff2block = {"ft":["Pal","Pal","Pal","Pal","Pal","Pal","FaithNoHarm", "Harm","FaithNoHarm", "Harm","FaithNoHarm", "Harm"],
                  "b": ["FaithNoPal", "FaithNoPal", "FaithNoPal", "FaithNoPal", "FaithNoPal", "FaithNoPal", "FaithNoHarm", "Harm","FaithNoHarm", "Harm","FaithNoHarm", "Harm", "Inter", "Inter", "Inter", "Inter", "Inter", "Inter"]};
block_suffs = ["ft", "b"];
shuffle(block_suffs);

//Put everything together to create the pieces of the training phase:
for (var block_num = 0; block_num < train_block_num; block_num++){
    var this_suff = block_suffs[block_num % 2];
    var block_template = suff2block[this_suff];
    shuffle(block_template);
    my_sd = get_suffDict(lang);
    for (var tt in my_sd[suff]["Train"]){
        shuffle(my_sd[suff]["Train"][tt]);
    }
    
    var answer_options = [];
    var current_option = 0;
    for (var trial = 0; trial < block_template.length; trial ++){
            answer_options.push(current_option);
            if (current_option == 0){
                current_option = 1;
             }
            else {
                current_option = 0
             }
     }    
    shuffle(answer_options); 
    shuffle(answer_options); 
    shuffle(answer_options); 
    shuffle(answer_options);
    shuffle(answer_options);
    shuffle(answer_options); 
    for (var trial = 0; trial < block_template.length; trial ++){
        //Set up the beginning of the block:
        var this_tt = block_template[trial];
        //var this_suff = my_sd[suff]["Train"][this_tt].pop();
        var this_meaning = suffix_to_meaning[this_suff];

        //Find the stem and corresponding picture for this trial:
        pic_file = pic_names.pop();
        var stem_num = stem_num_tracker["Train"][this_tt][this_suff];
        stem_num_tracker["Train"][this_tt][this_suff] += 1;
        if (stem_num == "undefined"){
                console.log("!!");
                console.log(this_tt);
                console.log("!!");
            }
        
        //Create the image for the SR:
        var picture_html = pic_dir.concat(pic_file);
        var meaning2SRImage = get_m2i(picture_html);
        var srImage = meaning2SRImage[suffix_to_meaning[this_suff]];
        
        //Create the image for the suffix UR:
        var meaning2suffixUrImage = get_m2i("http://people.umass.edu/bprickett/Opacity_Denial/outlined_square.jpg");
        var urImage = meaning2suffixUrImage[suffix_to_meaning[this_suff]];
        
        //Make the name of the audio file:
        bareStem_file = "Train_".concat(this_tt).concat("_BareStem_").concat(stem_num).concat("_").concat(this_suff).concat(".wav");
        ur_file = ur_dir.concat(suff).concat("_").concat(suff2vowel[this_suff]).concat(this_suff).concat("_right.wav");
        correct_file = "Train_".concat(this_tt).concat("_CorrectChoice_").concat(stem_num).concat("_").concat(this_suff).concat(".wav");
                
        //Set up the stimulus pairs:
        var audio_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='".concat(audio_dir).concat(bareStem_file).concat("' type='audio/wav'></audio>");
        var audio_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='".concat(ur_file).concat("' type='audio/wav'></audio>");          
            
        //Save these audio elements for preloading:
        all_audio = all_audio.concat("<audio style='visibility:hidden;' controls preload='auto'><source src='").concat(audio_dir).concat(bareStem_file).concat("' type='audio/wav'></audio>");
        all_audio = all_audio.concat("<audio style='visibility:hidden;' controls preload='auto'><source src='").concat(audio_dir).concat(correct_file).concat("' type='audio/wav'></audio>");
        //all_audio = all_audio.concat("<audio style='visibility:hidden;' controls preload='auto'><source src='").concat(audio_dir).concat(ur_file).concat("' type='audio/wav'></audio>");
       
        
        
        //Build the two pages that have audio in them:
        var urPage_html = player_functions.concat(silence_one).concat(silence_two).concat("<style>*.Message-continue-link {position: relative; left:200px;}</style><table align='center'><tr><td id='a_image'><img src='").concat(picture_html).concat("'></td><td><h1>+</h1></td><td id='b_image' style='padding:50px;'>").concat(urImage).concat("</td></tr><tr><td>").concat(audio_a).concat("</td><td></td><td>").concat(audio_b).concat("</td></tr></table>");
        var srPage_html = player_functions.concat("<style>*.Message-continue-link {position: relative; left:200px;}</style><table align='center'><tr><td><h1>=</h1></td><td style='padding:50px;' id='sr_image'>").concat(srImage).concat("</td></tr><tr><td><audio autoplay align='center' onPlay='audioStartSR()' onEnded='audioEndSR()'><source src='").concat(audio_dir).concat(correct_file).concat("' type='audio/wav'></audio></td></tr></table>");
        
        //Set up the item objects:
        train_items.push(["train_ur_"+i, "Message", {html:urPage_html}]);
        train_names.push("train_ur_"+i);
        train_items.push(["train_sr_"+i, "Message", {html:srPage_html}]);
        train_names.push("train_sr_"+i);
        i ++;
    }
   
    var bNum = block_num+1;
    bNum = bNum+"";        
    var this_break_page = [
                                   "train_bp_"+bNum,
                                   "Message",
                                   {
                                       html: "<h1>Training Block Complete</h1><p>Nice work! You've completed ".concat(bNum).concat(" out of ").concat(train_block_num+"").concat(" of the training blocks. Feel free to take a break now if you need one.</p>")
                                   }
                           ];        
    break_pages.push(this_break_page);
    train_names.push("train_bp_"+bNum);
    
    //Make a UR-training block:
    //var [ur_names, ur_items] = get_URLearning("train"+bNum, all_suffs); 
    //train_names = train_names.concat(ur_names);
    //train_choices = train_choices.concat(ur_items);
            
}


//**************************************
// BUILD TESTING TRIALS
//***************************************
var block_template = [
                                 "FaithNoHarm", "FaithNoPal", "Harm", "Pal", "Inter",
                                 "FaithNoHarm", "FaithNoPal", "Harm", "Pal", "Inter",
                                 "Harm_newAff", "Harm_newAff",
                                 "Inter_newAff", "Inter_newAff",
                                 "Inter_newType", "Inter_newType","Inter_newType","Inter_newType",
                     ];

//Arrays to build:
var test_items = [];
var test_names = [];
var i = 0;
                
var choice_function_1 = "<script>function audioEndPreA() {a = document.getElementById('option_A');a.style.color = 'red';a.style.fontWeight = 'bold';document.getElementById('a_player').play();}";
var choice_function_2 = "function audioEndPostA() {a = document.getElementById('option_A');a.style.color = 'black';a.style.fontWeight = 'normal';document.getElementById('sil_2').play();}";
var choice_function_3 = "function audioEndPreB() {b = document.getElementById('option_B');b.style.color = 'red';b.style.fontWeight = 'bold';document.getElementById('b_player').play();}";
var choice_function_4 = "function audioEndPostB() {b = document.getElementById('option_B'); b.style.color = 'black';b.style.fontWeight = 'normal';}</script>";
var choice_functions = choice_function_1.concat(choice_function_2).concat(choice_function_3).concat(choice_function_4);


//Put everything together to create the pieces of the testing phase:
for (var block_num = 0; block_num < test_block_num; block_num++){
    shuffle(block_template);
    my_sd = get_suffDict(lang);
    for (var tt in my_sd[suff]["Test"]){
       shuffle(my_sd[suff]["Test"][tt]);
    }
    for (var tt = 0; tt < block_template.length; tt++){
        //Find the stem and corresponding picture for this trial:
        pic_file = pic_names.pop();
        var this_tt = block_template[tt];
        var this_suff = my_sd[suff]["Test"][this_tt].pop()
        var this_meaning = suffix_to_meaning[this_suff];
        var stem_num = stem_num_tracker["Test"][this_tt][this_suff];
        stem_num_tracker["Test"][this_tt][this_suff] += 1
        
        if (this_tt.includes("newAff")){
              bareStem_file = "Test_".concat(block_template[tt]).concat("_BareStem_").concat(stem_num).concat("_").concat(this_suff).concat(".wav");
              ur_file = ur_dir.concat(suff).concat("_").concat(suff2vowel[this_suff]).concat(this_suff).concat("_withheld.wav");
              correct_file = "Test_".concat(block_template[tt]).concat("_CorrectChoice_").concat(stem_num).concat("_").concat(this_suff).concat(".wav");
              incorrect_file = "Test_".concat(block_template[tt]).concat("_IncorrectChoice_").concat(stem_num).concat("_").concat(this_suff).concat(".wav");
              
        }
        else{
              if (this_tt.includes("newType")){
                    bareStem_file = "Test_".concat(this_tt).concat("_BareStem_").concat(stem_num).concat("_").concat(this_suff).concat(".wav");
                    ur_file = ur_dir.concat(suff).concat("_").concat(suff2vowel[this_suff]).concat(this_suff).concat("_right.wav");
                    correct_file = "Test_".concat(this_tt).concat("_Both-Rules-ApplyingChoice_").concat(stem_num).concat("_").concat(this_suff).concat(".wav");
                    incorrect_file = "Test_".concat(this_tt).concat("_JustHarmonizingChoice_").concat(stem_num).concat("_").concat(this_suff).concat(".wav");
              }
              else {
                    bareStem_file = "Test_".concat(this_tt).concat("_BareStem_").concat(stem_num).concat("_").concat(this_suff).concat(".wav");
                    ur_file = ur_dir.concat(suff).concat("_").concat(suff2vowel[this_suff]).concat(this_suff).concat("_right.wav");
                    correct_file = "Test_".concat(this_tt).concat("_CorrectChoice_").concat(stem_num).concat("_").concat(this_suff).concat(".wav");
                    incorrect_file = "Test_".concat(this_tt).concat("_IncorrectChoice_").concat(stem_num).concat("_").concat(this_suff).concat(".wav");                  
              }
        }
        
        //Randomize which side the correct word happens on:
        var word_options = ["A", "B"]; 
        shuffle(word_options);
        var correct_word =  word_options[0];
    
        //Create the image for the suffix UR:
        var meaning2suffixUrImage = get_m2i("http://people.umass.edu/bprickett/Opacity_Denial/outlined_square.jpg");
        var urImage = meaning2suffixUrImage[this_meaning];
        
        //Set up the stimulus pairs:
        if (correct_word == "A"){
            var audio_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='".concat(audio_dir).concat(correct_file).concat("' type='audio/wav'></audio>");
            var audio_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='".concat(audio_dir).concat(incorrect_file).concat("' type='audio/wav'></audio>");          
        }
        else {
            var audio_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='".concat(audio_dir).concat(incorrect_file).concat("' type='audio/wav'></audio>");
            var audio_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='".concat(audio_dir).concat(correct_file).concat("' type='audio/wav'></audio>");  
        }
        var audio_stem = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='".concat(audio_dir).concat(bareStem_file).concat("' type='audio/wav'></audio>");
        var audio_suff = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='".concat(ur_file).concat("' type='audio/wav'></audio>");          
         

        //Save these audio elements for preloading:
        all_audio = all_audio.concat("<audio style='visibility:hidden;' controls preload='auto'><source src='").concat(audio_dir).concat(bareStem_file).concat("' type='audio/wav'></audio>");
        all_audio = all_audio.concat("<audio style='visibility:hidden;' controls preload='auto'><source src='").concat(audio_dir).concat(correct_file).concat("' type='audio/wav'></audio>");
        all_audio = all_audio.concat("<audio style='visibility:hidden;' controls preload='auto'><source src='").concat(audio_dir).concat(incorrect_file).concat("' type='audio/wav'></audio>");

        //Build the two pages that have audio in them:
        var choices_html = silence_one.concat(silence_two).concat(audio_a).concat(audio_b).concat(choice_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the <b>most</b> correct word for the above picture?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
        var picture_html = pic_dir.concat(pic_file);
        var urPage_html = player_functions.concat(silence_one).concat(silence_two).concat("<style>*.Message-continue-link {position: relative; left:200px;}</style><table align='center'><tr><td id='a_image'><img src='").concat(picture_html).concat("'></td><td><h1>+</h1></td><td id='b_image' style='padding:50px;'>").concat(urImage).concat("</td></tr><tr><td>").concat(audio_stem).concat("</td><td></td><td>").concat(audio_suff).concat("</td></tr></table>");
           
        //Set up the item objects:
        test_items.push(["test_stem_"+i, "Message", {html:urPage_html}]);
        test_names.push("test_stem_"+i);
        test_items.push(["test_choice_"+i, "ComicCaption", {s:"", q:choices_html, html:picture_html, mean:this_meaning, hasCorrect:correct_word, as:["A", "B"]}]);
        test_names.push("test_choice_"+i);
        //test_names.push("sep");
        i ++;
    }      
            
    var bNum = block_num+1;
    bNum = bNum+"";        
    var this_break_page = [
                                   "test_bp_"+bNum,
                                   "Message",
                                   {
                                       html: "<h1>Testing Block Complete</h1><p>Nice work! You've completed ".concat(bNum).concat(" out of ").concat(test_block_num+"").concat(" of the testing blocks. Feel free to take a break now if you need one.</p>")
                                   }
                           ];
    break_pages.push(this_break_page);
    test_names.push("test_bp_"+bNum);
    

    
}

//**************************************
// BUILD PRACTICE TRIALS
//***************************************

var sing2plur = {"leaf":"leaves", "ball":"balls", "hoof":"hooves", "bag":"bags", "cat":"cats", "brick":"bricks"};
var practice_nouns = ["leaf", "ball", "hoof", "bag", "cat", "brick"];
shuffle(practice_nouns);
var practice_items = [];
var practice_names = [];
var audio_dir = "https://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/";

for (n = 0; n < practice_nouns.length; n++){
    this_noun = practice_nouns[n];
    var picture_html = "https://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/".concat(this_noun).concat(".png");
     
    //Create the image for the SR:
    var meaning2SRImage = get_m2i(picture_html);
    var srImage = meaning2SRImage["plural"];
                
    //Create the image for the suffix UR:
    var meaning2suffixUrImage = get_m2i("http://people.umass.edu/bprickett/Opacity_Denial/outlined_square.jpg");
    var urImage = meaning2suffixUrImage["plural"];
                
    //Make the name of the audio file:
    bareStem_file = this_noun.concat(".wav");
    ur_file = audio_dir.concat("s.wav");
    correct_file = sing2plur[this_noun].concat(".wav"); 
           
       
    //Set up the stimulus pairs:
    var audio_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='".concat(audio_dir).concat(bareStem_file).concat("' type='audio/wav'></audio>");
    var audio_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='".concat(ur_file).concat("' type='audio/wav'></audio>");   
         
    //Save these audio elements for preloading:
    all_audio = all_audio.concat("<audio style='visibility:hidden;' controls preload='auto'><source src='").concat(audio_dir).concat(bareStem_file).concat("' type='audio/wav'></audio>");
    all_audio = all_audio.concat("<audio style='visibility:hidden;' controls preload='auto'><source src='").concat(audio_dir).concat(correct_file).concat("' type='audio/wav'></audio>");          
  
    //Build the two pages that have audio in them:
    var urPage_html = player_functions.concat(silence_one).concat(silence_two).concat("<style>*.Message-continue-link {position: relative; left:200px;}</style><table align='center'><tr><td id='a_image'><img src='").concat(picture_html).concat("'></td><td><h1>+</h1></td><td id='b_image' style='padding:50px;'>").concat(urImage).concat("</td></tr><tr><td>").concat(audio_a).concat("</td><td></td><td>").concat(audio_b).concat("</td></tr></table>");
    var srPage_html = player_functions.concat("<style>*.Message-continue-link {position: relative; left:200px;}</style><table align='center'><tr><td><h1>=</h1></td><td style='padding:50px;' id='sr_image'>").concat(srImage).concat("</td></tr><tr><td><audio autoplay align='center' onPlay='audioStartSR()' onEnded='audioEndSR()'><source src='").concat(audio_dir).concat(correct_file).concat("' type='audio/wav'></audio></td></tr></table>");

    //Set up the item objects:
    practice_items.push(["practice_ur_"+n, "Message", {html:urPage_html}]);
    practice_names.push("practice_ur_"+n);
    practice_items.push(["practice_sr_"+n, "Message", {html:srPage_html}]);
    practice_names.push("practice_sr_"+n);
                
    
              
}
        
var practice_test_items = [];
var practice_test_names = [];
var practice_test_nouns = ["leg", "submarine", "wolf", "cake"];   
var practice_test_plurals = ["legs", "submarines", "wolves", "cakes"];
var practice_test_decoys = ["leks", "submarinets", "wolfs", "cages"]; 
var practice_test_indeces = [0, 1, 2, 3];
shuffle(practice_test_indeces);    
for (n = 0; n < practice_test_indeces.length; n++){
    this_index = practice_test_indeces[n];
    this_noun = practice_test_nouns[this_index];
    this_right = practice_test_plurals[this_index];
    this_wrong = practice_test_decoys[this_index];
    var picture_html = "https://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/".concat(this_noun).concat(".png");
     
    //Create the image for the SR:
    var meaning2SRImage = get_m2i(picture_html);
    var srImage = meaning2SRImage["plural"];
                
    //Create the image for the suffix UR:
    var meaning2suffixUrImage = get_m2i("http://people.umass.edu/bprickett/Opacity_Denial/outlined_square.jpg");
    var urImage = meaning2suffixUrImage["plural"];
                
    //Make the name of the audio file:
    bareStem_file = this_noun.concat(".wav");
    ur_file = audio_dir.concat("s.wav");
    correct_file = this_right.concat(".wav");   
    incorrect_file = this_wrong.concat(".wav"); 
       
    //Randomize which side the correct word happens on:
    var word_options = ["A", "B"];
    shuffle(word_options);
    var correct_word =  word_options[0];
    
    //Create the image for the suffix UR:
    var meaning2suffixUrImage = get_m2i("http://people.umass.edu/bprickett/Opacity_Denial/outlined_square.jpg");
    var urImage = meaning2suffixUrImage["plural"];
        
    //Set up the stimulus pairs:
    if (correct_word == "A"){
            var audio_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='".concat(audio_dir).concat(correct_file).concat("' type='audio/wav'></audio>");
            var audio_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='".concat(audio_dir).concat(incorrect_file).concat("' type='audio/wav'></audio>");          
    }
    else {
            var audio_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='".concat(audio_dir).concat(incorrect_file).concat("' type='audio/wav'></audio>");
            var audio_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='".concat(audio_dir).concat(correct_file).concat("' type='audio/wav'></audio>");  
     }
     var audio_stem = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='".concat(audio_dir).concat(bareStem_file).concat("' type='audio/wav'></audio>");
     var audio_suff = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='".concat(ur_file).concat("' type='audio/wav'></audio>");          
         

     //Save these audio elements for preloading:
     all_audio = all_audio.concat("<audio style='visibility:hidden;' controls preload='auto'><source src='").concat(audio_dir).concat(bareStem_file).concat("' type='audio/wav'></audio>");
     all_audio = all_audio.concat("<audio style='visibility:hidden;' controls preload='auto'><source src='").concat(audio_dir).concat(correct_file).concat("' type='audio/wav'></audio>");
     all_audio = all_audio.concat("<audio style='visibility:hidden;' controls preload='auto'><source src='").concat(audio_dir).concat(incorrect_file).concat("' type='audio/wav'></audio>");

     //Build the two pages that have audio in them:
     var choices_html = silence_one.concat(silence_two).concat(audio_a).concat(audio_b).concat(choice_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the <b>most</b> correct word for the above picture?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
     var urPage_html = player_functions.concat(silence_one).concat(silence_two).concat("<style>*.Message-continue-link {position: relative; left:200px;}</style><table align='center'><tr><td id='a_image'><img src='").concat(picture_html).concat("'></td><td><h1>+</h1></td><td id='b_image' style='padding:50px;'>").concat(urImage).concat("</td></tr><tr><td>").concat(audio_stem).concat("</td><td></td><td>").concat(audio_suff).concat("</td></tr></table>");
           
     //Set up the item objects:
     practice_test_items.push(["ptest_stem_"+i, "Message", {html:urPage_html}]);
     practice_test_names.push("ptest_stem_"+i);
     practice_test_items.push(["ptest_choice_"+i, "ComicCaption", {s:"", q:choices_html, html:picture_html, mean:"Practice", hasCorrect:correct_word, as:["A", "B"]}]);
     practice_test_names.push("ptest_choice_"+i);
        
     //test_names.push("sep");
     i ++;
              
}
        

//**********************
// BUILD ITEMS ARRAY
//***********************

//Pieces of the "intro" screen:
instruct = "<style>*.Message-continue-link {position: relative; left:200px;}</style><div style='padding:50px;'><h1>Welcome!</h1><p>In this experiment, you will be asked to learn aspects of an imaginary ‘alien’ language. The experiment should take about an hour, but there is some important information that we need to go over first:</p><ul>";
headphones = "<li>Please wear headphones while participating.</li><li>Do not take notes of any kind during the experiment.</li>";
contact = "<li>Feel free to contact the researcher at bprickett@umass.edu if you have any questions or concerns.</li>";
browser = "<li>And <u>do not use Internet Explorer or Safari</u>, as the experiment software will not work with these browsers. <span style='font-weight: bold;color:red;'>If you are using these browsers, you will not be compensated.</span> Please use another browser, such as: Google Chrome, Microsoft Edge, Firefox, or Opera.</li></ul>";
consent = "<input type='checkbox' id='consent' name='consent' class='obligatory'>I have read the <a href='http://people.umass.edu/bprickett/ConsentForm_OpDen.pdf' target='_blank'>consent form</a> and agree to participate in this experiment.</div>";
      
//Start material:
var items = [
               ["preload_img", "Preloader", {images: IMAGES_TO_PRELOAD}], 
               [
                   "intro", 
                   "Form", 
                   {
                       html: instruct.concat(headphones).concat(contact).concat(browser).concat(consent),
                       consentRequired: true,
                       transfer: "click"
                   }
               ],
               ["headphone_check", "Form", {consentRequired: false, html:"<b>What kind of headphones are you using? (Please give the brand and model number if available)</b><br><br>"+'<textarea rows="3" cols="60" name="headphones" class="obligatory"></textarea><br><br>'}],
               ["comp_feedback", "my_Separator", {normalMessage:"<img src='https://people.umass.edu/bprickett/Opacity_Denial/Check_Pic.png'>", errorMessage:"<img src='https://people.umass.edu/bprickett/Opacity_Denial/X_pic.png'>", transfer:1500, ignoreFailure: false}],
             ];
        
items.push([
                   "Instr0",
                   "Message",
                   {html:  
                          "<h1>Structure of the Experiment</h1>"
                          +"<p>We will now walk through a few screens of instructions and practice trials. There will be some comprehension "
                          +"questions along the way to make sure you have understood the instructions. So please read carefully!</p>"
                          +"<p>After the instructions/practice the rest of the experiment will proceed as follows:<ul>"
                          +"<li>A Training phase, divided into "+train_block_num+" blocks.</li>"
                          +"<li>A Testing phase, divided into "+test_block_num+" blocks.</li>"
                          +"<li>A short survey, with questions about your experience.</li></ul>"
                          +"<p>You can take short rest breaks between blocks if you need to.</p>"
                    }
            ]);
        
items.push(["compQ0", "Question", {q:"Which of the following is <strong>not</strong> a phase in the experiment?", hasCorrect:"Guessing Phase", as:["Training Phase", "Testing Phase", "Guessing Phase"]}]);
        
items.push([
                   "Instr1",
                   "Message",
                   {html:  
                          "<h1>Instructions</h1>"
                          +"<p>Languages often add <i>suffixes</i> to the end of words to express some meaning. For example, in English we add ‘-s’ to the end of nouns to change a word from singular to plural:"
                          +"<ul><li>‘cat’ &rarr; ‘cats’'</li>"
                          +"<li>‘ball’ &rarr; ‘balls’</li>"
                          +"<li>‘lake’ &rarr; ‘lakes’</li></ul>"
                    }
            ]); 
        
 items.push(["compQ1", "Question", {q:"Which of the following is <strong>not</strong> true?", hasCorrect:"Suffixes are added to the beginning of a word", as:["English ‘-s’ is a suffix", "Suffixes are added to the beginning of a word", "English ‘-s’ expresses the plural"]}]);
  
items.push([
                   "Instr2",
                   "Message",
                   {html:  
                          "<h1>Instructions (Continued)</h1>"
                          +"<p>Suffixes may sound different with some words. For example, in ‘cats’ the ‘-s’ is pronounced like an ‘s’ sound, but in ‘balls’ the ‘-s’ makes a ‘z’ sound."
                          +" Other times, words change because of the suffix that’s added to them. For example, in ‘leaves’ the ‘f’ sound of ‘leaf’ becomes a ‘v’ sound.</p>"
                          +"<p><span style='font-weight:bold;'>In this experiment, you’ll be learning how to pronounce words when different suffixes are added.</span> But first, we’re going to do some practice trials in English.</p>"
                    }
            ]);        
        
 items.push(["compQ2", "Question", {q:"How is the ‘-s’ suffix pronounced in the word ‘balls’?", hasCorrect:"Like ‘z’", as:["Like ‘z’", "Like ‘v’", "Like ‘s’"]}]);
 
 items.push([
                   "Instr3", 
                   "Message", 
                   {html: 
                          "<h1>How you’ll learn...</h1>"
                          +"<p>In each training trial, you’ll be shown two images, separated by a ‘+’ symbol: the first will represent the meaning of a noun and the second will represent the meaning of a suffix.</p><p><strong>Don't worry about memorizing individual nouns&mdash;you will always be told how to pronounce the noun by itself.</strong></p>"
                          +"<p>You’ll also hear two audio files: the first will teach you the pronunciation of the noun (while a <span style='color:red;font-weight:bold;'>red</span> box appears around the noun’s picture) and then the second one will teach you the pronunciation of the suffix (while a <span style='color:red;font-weight:bold;'>red</span> box appears around that image).</p>"
                          +"<img style='height: 400px; width:400px' src='http://people.umass.edu/bprickett/Opacity_Denial/cat plus plural example.png'>"
                   }
             ]);
  items.push([
                  "Instr3.5",
                  "Message",
                  {html:
                          "<h1>How you’ll learn... (Continued)</h1>"
                          +"<p>On the next screen, you’ll see an ‘=’ symbol and an image demonstrating the meaning that results from combining that suffix with the noun."
                          +" A <span style='color:red;font-weight:bold;'>red</span> box will appear around this image and you’ll hear how the noun and suffix are pronounced when they’re added together.</p>"
                          +"<img style='height: 400px; width:400px' src='https://people.umass.edu/bprickett/Opacity_Denial/equals cats example.png'>"
                   }
              ]);
    
 
//Learning the affixes   
items.push(["compQ3", "Question", {q:"What will appear after the ‘=’ symbol?", hasCorrect:"A picture of what the noun+suffix means", as:["A picture of what the noun+suffix means", "A picture of what just the suffix means", "A picture of what just the noun means"]}]);

items.push([
                  "Instr4",
                  "Message",
                  {html:
                          "<h1>Summary</h1>"
                          +"<p>Don’t worry about memorizing the nouns. You will always be told how to pronounce the noun by itself. Your job is to learn how to pronounce the noun+suffix combination for each noun and suffix you get.</p>"
                          +"<p>On each trial, listen to the noun and the suffix and pay attention to how the resulting noun+suffix combination is pronounced.</p>"
                          +"<p>In the Test phase of the experiment, the trials will be the same, except you will not be told the correct pronunciation of the noun+suffix combination. Instead, you will be asked to choose which of two options is the correct pronunciation of the noun+suffix.</p>"
                   }
              ]);
           
items.push(["compQ4", "Question", {q:"What should you focus on learning?", hasCorrect:"How the noun+suffix combinations are pronounced", as:["How the noun+suffix combinations are pronounced", "How the nouns are pronounced by themselves", "Which pictures go with which nouns"]}]);

    
//Linguistics lesson pages:
items.push([
                   "Instr5", 
                   "Message", 
                   {html: 
                         "<h1>Practice Training in English</h1>"+
                         "<p>Now that you know how the experiment will work, you’re ready to do some practice trials in English."+
                         " Remember to pay attention to how both the words and suffixes are pronunced when they are combined.</p>"
                         
                   }
             ]);
        
items = items.concat(practice_items);     
     
items.push([
                   "Instr6",
                   "Message",
                   {html:
                         "<h1>Practice Testing in English</h1>"+
                         "<p>Ok, that’s how the Training phase of the experiment will work. Once training is done, you will enter the Testing phase."+
                         " Using English examples for practice, the next few trials will show you how the Test phase will work.</p>"
                         
                   }
             ]); 
        
items = items.concat(practice_test_items);     
        
items.push([
                   "Instr7", 
                   "Message", 
                   {html: 
                         "<h1>Alien Suffixes</h1>"+
                         "<p>Nice work! You’ve completed the English practice trials and are ready to start learning the alien language. Instead of learning the plural in the alien language, you’ll be learning a different kind of suffix:"+
                         "<ul><li>The alien language uses a set of suffixes to give directions relative to a noun.</li>"+
                         "<li>For example, instead of saying ‘to the left of the cat’, the aliens would combine the word for ‘cat’ with a suffix that means ‘to the left of’.</ul></p>"
                         
                   }
             ]);
items.push(["compQ7", "Question", {q:"What do the alien suffixes express?", hasCorrect:"Directions", as:["Directions", "Plural", "Past Tense"]}]);
        
items.push([
                   "Instr8",
                   "Message",
                   {html:
                         "<h1>Alien Suffixes (Continued)</h1>"+
                         "<ul><li>To illustrate the suffix meanings, we’ll use a red arrow that’s either to the left, right, or in front of an empty box."+
                         "<li>Then, to demonstrate the meaning of a noun+suffix combination, we'll have the arrow positioned relative to a picture of a noun.</ul>"+
                         "Just like the English examples, audio will play for each image and a <span style='color:red;font-weight:bold;'>red</span> box will show you which image the audio corresponds to.</p>"+
                         "<img style='height: 400px; width:600px' src='http://people.umass.edu/bprickett/Opacity_Denial/cat plus front example.png'>"
                   }
             ]);
items.push(["compQ8", "Question", {q:"What in the images will represent the directions being given?", hasCorrect:"A red arrow", as:["A red arrow", "A pointing finger", "A circle"]}]);        
    
items.push(["Instr9", "Message", 
                   {
                       html: "<h1>Training Phase Start</h1><div>"
                             +"<p>Now you’re ready to start the experiment’s training phase. Remember:"
                             +"<ul><li>Pay attention to how words and suffixes are pronounced&mdash;both by themselves and when they’re combined.</li>"
                             +"<li>Don’t worry about memorizing individual nouns or pictures.</li>"
                             +"<li>Your job is to learn how to pronounce the noun+suffix combination for each noun and suffix.</li>"
                             +"<li>There will be breaks throughout, so if you need to rest, wait for one of those to occur.</li></ul>"
                             +"Good luck!</p>"
                   }
            ]);
        
//Training items...
items = items.concat(train_items);
items = items.concat(break_pages);

//Test items...
items = items.concat(test_items);

//Ending material:
items = items.concat([    
               [
                   "survey", 
                   "Form", 
                   {
                       consentRequired: false,
                       html:"<h2>Please answer the following questions about yourself:</h2><p><i>None of your answers here will impact your compensation and you can skip anything you feel uncomfortable providing us with.</i></p>"+
                              "<div>"+
                                "<b>A) What is your year of birth? (Please answer with a four-digit year, like '1992')</b><br><br>"+
                                  '<textarea rows="1" cols="4" name="age"></textarea><br><br>'+
                                "<b>B) What is your gender?</b><br>"+
                                  '<input type="radio" name="gender" value="W"> Woman<br>'+
                                  '<input type="radio" name="gender" value="M"> Man<br>'+
                                  '<input type="radio" name="gender" value="N"> Non-Binary<br>'+
                                  '<input type="radio" name="gender" value="O"> Other<br>'+
                                  '<input type="radio" name="gender" value="P"> Prefer not to Say<br><br><br>'+
                                "<b>C) Please describe your prior language experience (for example, do you speak any languages other than English?):</b><br><br>"+
                                  '<textarea rows="4" cols="50" name="prior_ling_exp"></textarea><br><br>'+
                              "</div>"+
                            "<h2>Please also answer the following questions about your experience:</h2>"+
                              "<div>"+
                                "<b>1) How did you approach the training trials? Please choose all that apply.</b><br>"+
                                  '<input type="checkbox" name="train_approach" value="intuition_gut"> Went by intuition or gut feeling.<br>'+
                                  '<input type="checkbox" name="train_approach" value="memorize"> Tried to memorize the words.<br>'+
                                  '<input type="checkbox" name="train_approach" value="rule_pattern"> Tried to find a rule or pattern.<br>'+
                                  '<input type="checkbox" name="train_approach" value="notes"> Took notes<br>'+
                                "<br><b>2) Please describe what you did in as much detail as possible. If you looked for a rule, what rules did you try?</b><br><br>"+
                                  '<textarea rows="4" cols="50" name="train_description"></textarea><br><br>'+
                                "<br><b>3) How did you approach the test trials? Please choose all that apply:</b><br>"+
                                  '<input type="checkbox" name="test_approach" value="similarity"> Chose words that sounded <i>similar</i> to the words from other trials.<br>'+
                                  '<input type="checkbox" name="test_approach" value="difference"> Chose words that sounded <i>different</i> to the words from other trials.<br>'+
                                  '<input type="checkbox" name="test_approach" value="rule_pattern"> Chose words that fit a rule or pattern.<br>'+ 
                                "<br><b>4) Again, please describe what you did in as much detail as you can. If you used a rule, what was it?</b><br><br>"+
                                  '<textarea rows="4" cols="50" name="test_description"></textarea><br><br>'+
                                "<br><b>5) What percent of test trials do you think you got right?</b><br><br>"+
                                  '<textarea rows="1" cols="3" name="test_percentage"></textarea><br><br>'+
                                "<br><b>6) Did you have an “Aha!” moment, where you suddenly realized what the pattern was?</b><br>"+
                                  '<input type="radio" name="aha_yesNo" value="1"> Yes<br>'+
                                  '<input type="radio" name="aha_yesNo" value="0"> No<br>'+
                                "<br><b>7) If so, please describe the “aha!” moment. When did it happen? What exactly did you suddenly realize?</b><br><br>"+
                                  '<textarea rows="4" cols="50" name="aha_description"></textarea><br><br>'+
                                "<br><b>8) If you have any other questions or comments please type those here:</b><br><br>"+
                                  '<textarea rows="4" cols="50" name="Qs_Meaning='+meaning_string+'"></textarea><br><br>'+
                              "</div>"+
                              "<h2>Now please enter your Prolific ID:</h2>"+
                              "<div><textarea rows='1' cols='50' name='prolific_id' class='obligatory'></textarea><br><br></div>"
                   }
               ],
               [
                   "phaseSeperator", 
                   "Message", 
                   {
                       html: "<h1>Test Phase</h1>"+
                             "<p>Now you will begin the Test Phase. Unlike the trials in training, you will no longer be given the correct noun+suffix combination. Instead, after hearing each noun and suffix, you’ll be asked to choose between two different pronunciations of the noun+suffix.</p>"+
                             "<p>It’s ok if you are not totally sure. Choose the option that sounds the most like it comes from the alien language you learned in Training.</p>"
                   }
               ],
               ["sr", "__SendResults__", { }],
               [
                   "end", 
                   "Message", 
                   {
                       transfer: 15000,
                       html: "<div><p>All done! To receive compensation, click <a href='https://app.prolific.co/submissions/complete?cc=542E1FD6'>here</a>.</p></div>"
                   }
               ],
               [
                   "preload_audio",
                   "Message",
                   {
                       consentRequired: false,
                       html: "<div align='center'>Loading audio files...</div>"+all_audio,
                       transfer: 15000
                   }
               ],
          ]);

//Define sequence of experiment; preload must be first
var all_trials = [  
                    "preload_img","preload_audio",  
                    "intro", "headphone_check",  "Instr0", "compQ0", "comp_feedback",
                    "Instr1", "compQ1", "comp_feedback", "Instr2", "compQ2", "comp_feedback",  
                    "Instr3", "Instr3.5","compQ3", "comp_feedback", "Instr4", "compQ4", "comp_feedback", "Instr5"
                  ];
all_trials = all_trials.concat(practice_names);   
all_trials = all_trials.concat([   
                    "Instr6"
                 ]);
all_trials = all_trials.concat(practice_test_names);   
all_trials = all_trials.concat([   
                    "Instr7", "compQ7", "comp_feedback", "Instr8","compQ8", "comp_feedback", "Instr9"
                 ]);
                
all_trials = all_trials.concat(train_names);
all_trials = all_trials.concat(["phaseSeperator"]);
all_trials = all_trials.concat(test_names);
all_trials = all_trials.concat(["survey", "sr", "end"]);
           
       
//Send all of this info to the Ibex scripts that actually make the webpage:
var shuffleSequence = seq(...all_trials);
var showProgressBar = false;
var manualSendResults = true;

    
//Set some defaults:
var defaults = [
    "my_Separator", {
        transfer: 2500,
        normalMessage: "Press any key to continue.",
        errorMessage: "Error! Please contact experimenter.",
        ignoreFailure: true
    },
    "ComicCaption", { //Options for ComicCaption items
        //as: [["y","Yes"], ["n","No"]],
        as: ["Yes", "No"],
        presentHorizontally: true,
        instructions: "",
        leftComment: "",
        rightComment: "",
        randomOrder: false,
        saveReactionTime: true
    }
];


