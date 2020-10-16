//Software based on Carolyn Anderson's ComicCaption Ibex software.
//Preload images using Alex Drummond's Preloader controller.
//All bugs, errors, and stylistic faux pas can be attributed to Brandon Prickett.

//**************************************
// INITIALIZE VARIABLES AND FUNCTIONS
//***************************************

//Conditions:
var lang = "F";
var head = "I";
var suff = "1";
var subj = "1";

//Other params:
var test_run = false; //Should be false
var train_block_num = 5; //Should be 5
var test_block_num = 4; //Should be 4
    
//Functions
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function get_numbers(amount, letters){
  var nums = [];
  var div_amount = amount/letters.length;
  for (var i = 0; i < div_amount; i++){
      for (var j = 0; j < letters.length; j++){
        nums.push(letters[j]+"_"+i);
      }
  }
  shuffle(nums);
  return nums;
}
      
     
//List of images
var pic_names = [];
var jpgs = ["2.jpg", "4.jpg", "23.jpg", "24.jpg", "6.jpg", "9.jpg", "10.jpg", "18.jpg", "20.jpg", "25.jpg", "26.jpg", "27.jpg", "28.jpg", "31.jpg", "32.jpg", "33.jpg", "34.jpg", "35.jpg", "36.jpg", "37.jpg", "39.jpg", "41.jpg", "42.jpg", "45.jpg", "48.jpg", "49.jpg", "50.jpg", "52.jpg", "55.jpg", "59.jpg", "62.jpg", "65.jpg", "72.jpg", "73.jpg", "76.jpg", "79.jpg", "81.jpg", "84.jpg", "86.jpg", "87.jpg", "88.jpg", "90.jpg", "92.jpg", "93.jpg", "94.jpg", "97.jpg", "107.jpg", "109.jpg", "121.jpg", "125.jpg", "127.jpg", "130.jpg", "132.jpg", "134.jpg", "135.jpg", "137.jpg", "138.jpg", "139.jpg", "140.jpg", "142.jpg", "143.jpg", "145.jpg", "148.jpg", "149.jpg", "154.jpg", "160.jpg", "161.jpg", "166.jpg", "168.jpg", "173.jpg", "174.jpg", "178.jpg", "183.jpg", "185.jpg", "187.jpg", "189.jpg", "190.jpg", "191.jpg", "192.jpg", "193.jpg", "196.jpg", "197.jpg", "198.jpg", "199.jpg"]; 
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
IMAGES_TO_PRELOAD.push("https://people.umass.edu/bprickett/Opacity_Denial/alien_face_happy.png");
IMAGES_TO_PRELOAD.push("https://people.umass.edu/bprickett/Opacity_Denial/alien_face_confused.png");
IMAGES_TO_PRELOAD.push("https://people.umass.edu/bprickett/Opacity_Denial/alien_face_neutral.png");
IMAGES_TO_PRELOAD.push("https://people.umass.edu/bprickett/Opacity_Denial/Check_Pic.png");
IMAGES_TO_PRELOAD.push("https://people.umass.edu/bprickett/Opacity_Denial/X_pic.png");
IMAGES_TO_PRELOAD.push("https://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/human_face_happy.png");
IMAGES_TO_PRELOAD.push("https://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/human_face_confused.png");
IMAGES_TO_PRELOAD.push("https://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/human_face_neutral.png");
var ur_pics = [
        "asparagus.png", "atom.png", "bean_bag.png", 
        "cape.png", "eiffel_tower.png", "fanny_pack.jpg", "football.png",
        "goat.jpg", "hoe.jpg", "hospital.png", "kimono.png", "llama.png",
        "rope.jpg", 
        //"sailboat.png", "slide.png", "volcano.jpg","bonzai_tree.png", 
        "squirrel.jpg", "surfboard.png",
         "wine_bottle.png"
      ];
for (var p = 0; p < ur_pics.length; p++){
    p_name = ur_pics[p];
    IMAGES_TO_PRELOAD.push("https://people.umass.edu/bprickett/Opacity_Denial/Suffix_UR_Phase/".concat(p_name)); 
}

//**************************************
// BUILD TRAINING TRIALS
//***************************************

//General data to keep track of:    
var audio_dir = "https://people.umass.edu/bprickett/Opacity_Denial/Stem Heads=".concat(head).concat("_Language=").concat(lang).concat("_Suffixes=").concat(suff).concat("_Subj").concat(subj).concat("/");
if (lang == "F" || lang == "CF"){
    var c2tt2suffs = {
    
                     "1": {
                               "Train": {
                                              "FaithNoHarm": ["D", "P", "B", "F"],
                                              "FaithNoPal": ["B", "F"],
                                              "Harm": ["D", "P", "B", "F"],
                                              "Inter": ["B", "F"],
                                              "Pal": ["D", "P"]
                                         },
                               "Test":  {
                                              "FaithNoHarm": ["D", "P", "B", "F"],
                                              "FaithNoPal": ["B", "F"],
                                              "Pal": ["D", "P"],
                                              "Harm_old": ["D", "P", "B", "F"],
                                              "Harm_newAff": ["K"],
                                              "Inter_old": ["B", "F"],
                                              "Inter_newAff": ["K"],
                                              "Inter_newType": ["D", "P"],
                                         }
                           },  
    
                     "2": {
                               "Train": {
                                              "FaithNoHarm": ["F", "K", "D", "P"],
                                              "FaithNoPal": ["D", "P"],
                                              "Harm": ["F", "K", "D", "P"],
                                              "Inter": ["D", "P"],
                                              "Pal": ["F", "K"]
                                         },
                               "Test":  {
                                              "FaithNoHarm": ["F", "K", "D", "P"],
                                              "FaithNoPal": ["D", "P"],
                                              "Pal": ["F", "K"],
                                              "Harm_old": ["F", "K", "D", "P"],
                                              "Harm_newAff": ["B"],
                                              "Inter_old": ["D", "P"],
                                              "Inter_newAff": ["B"],
                                              "Inter_newType": ["F", "K"],
                                         }
                           } 
                };
   };
if (lang == "B" || lang == "CB"){
    var c2tt2suffs = {
    
                     "1": {
                               "Train": {
                                              "FaithNoHarm": ["D", "P", "B", "F"],
                                              "FaithNoPal": ["B", "F"],
                                              "Harm": ["D", "P", "B", "F"],
                                              "Inter": ["D", "P"],
                                              "Pal": ["D", "P"]
                                         },
                               "Test":  {
                                              "FaithNoHarm": ["D", "P", "B", "F"],
                                              "FaithNoPal": ["B", "F"],
                                              "Pal": ["D", "P"],
                                              "Harm_old": ["D", "P", "B", "F"],
                                              "Harm_newAff": ["K"],
                                              "Inter_old": ["D", "P"],
                                              "Inter_newAff": ["K"],
                                              "Inter_newType": ["B", "F"],
                                         }
                           },  
    
                     "2": {
                               "Train": {
                                              "FaithNoHarm": ["F", "K", "D", "P"],
                                              "FaithNoPal": ["D", "P"],
                                              "Harm": ["F", "K", "D", "P"],
                                              "Inter": ["F", "K"],
                                              "Pal": ["F", "K"]
                                         },
                               "Test":  {
                                              "FaithNoHarm": ["F", "K", "D", "P"],
                                              "FaithNoPal": ["D", "P"],
                                              "Pal": ["F", "K"],
                                              "Harm_old": ["F", "K", "D", "P"],
                                              "Harm_newAff": ["B"],
                                              "Inter_old": ["F", "K"],
                                              "Inter_newAff": ["B"],
                                              "Inter_newType": ["D", "P"],
                                         }
                           } 
                };
   };

var get_miniBlock_template = { //Key1=Suffix set, Key2=Language, Key3=Suffix, Value=List of trials types for that suffix in that language-suffix-set pairing
                       "1":
                            {
                              "B": {"B":["FaithNoHarm","Harm","FaithNoPal", "FaithNoPal"], "D":["FaithNoHarm","Harm","Pal", "Pal","Inter", "Inter"], "F":["FaithNoHarm","Harm","FaithNoPal", "FaithNoPal"], "P":["FaithNoHarm","Harm","Pal", "Pal","Inter", "Inter"]},
                              "F":{"B":["FaithNoHarm","Harm","FaithNoPal", "FaithNoPal","Inter", "Inter"], "D":["FaithNoHarm","Harm","Pal", "Pal"], "F":["FaithNoHarm","Harm","FaithNoPal", "FaithNoPal","Inter", "Inter"], "P":["FaithNoHarm","Harm","Pal", "Pal"]},
                              "CB":{"B":["FaithNoHarm","Harm","FaithNoPal", "FaithNoPal"], "D":["FaithNoHarm","Harm","Pal", "Pal","Inter", "Inter"], "F":["FaithNoHarm","Harm","FaithNoPal", "FaithNoPal"], "P":["FaithNoHarm","Harm","Pal", "Pal","Inter", "Inter"]},
                              "CF":{"B":["FaithNoHarm","Harm","FaithNoPal", "FaithNoPal","Inter", "Inter"], "D":["FaithNoHarm","Harm","Pal", "Pal"], "F":["FaithNoHarm","Harm","FaithNoPal", "FaithNoPal","Inter", "Inter"], "P":["FaithNoHarm","Harm","Pal", "Pal"]}
                             },
                       "2":
                            {
                              "B": {"D":["FaithNoHarm","Harm","FaithNoPal", "FaithNoPal"], "F":["FaithNoHarm","Harm","Pal", "Pal","Inter", "Inter"], "P":["FaithNoHarm","Harm","FaithNoPal", "FaithNoPal"], "K":["FaithNoHarm","Harm","Pal", "Pal","Inter", "Inter"]},
                              "F":{"D":["FaithNoHarm","Harm","FaithNoPal", "FaithNoPal","Inter", "Inter"], "F":["FaithNoHarm","Harm","Pal", "Pal"], "P":["FaithNoHarm","Harm","FaithNoPal", "FaithNoPal","Inter", "Inter"], "K":["FaithNoHarm","Harm","Pal", "Pal"]},
                              "CB":{"D":["FaithNoHarm","Harm","FaithNoPal", "FaithNoPal"], "F":["FaithNoHarm","Harm","Pal", "Pal","Inter", "Inter"], "P":["FaithNoHarm","Harm","FaithNoPal", "FaithNoPal"], "K":["FaithNoHarm","Harm","Pal", "Pal","Inter", "Inter"]},
                              "CF":{"D":["FaithNoHarm","Harm","FaithNoPal", "FaithNoPal","Inter", "Inter"], "F":["FaithNoHarm","Harm","Pal", "Pal"], "P":["FaithNoHarm","Harm","FaithNoPal", "FaithNoPal","Inter", "Inter"], "K":["FaithNoHarm","Harm","Pal", "Pal"]}
                             }
                     };

var trialInfo2Stem = {
                          "Train": {},
                          "Test":  {
                                      "FaithNoHarm": get_numbers(8, c2tt2suffs[suff]["Test"]["FaithNoHarm"]),
                                      "FaithNoPal": get_numbers(8, c2tt2suffs[suff]["Test"]["FaithNoPal"]),
                                      "Pal": get_numbers(8, c2tt2suffs[suff]["Test"]["Pal"]),
                                      "Harm_old": get_numbers(8, c2tt2suffs[suff]["Test"]["Harm_old"]),
                                      "Harm_newAff": get_numbers(20, c2tt2suffs[suff]["Test"]["Harm_newAff"]),
                                      "Inter_old":get_numbers(8, c2tt2suffs[suff]["Test"]["Inter_old"]),
                                      "Inter_newAff": get_numbers(20, c2tt2suffs[suff]["Test"]["Inter_newAff"]),
                                      "Inter_newType": get_numbers(20, c2tt2suffs[suff]["Test"]["Inter_newType"]),

                           }    
                      };

//Create a mapping between the meaning labels used here and their English equivalent:
var meaningToEnglish = {"L":"to the left of", "R":"to the right of", "T":"above", "B":"below", "F":"in front of"};
  
//Create suffix->meaning mapping for this participant:
var suffix_to_meaning = {};
var meaning_to_suffix = {};
var meanings = ["T", "B", "F"];
var other_means = ["L", "R"];
var meaning_string = "";
shuffle(other_means);
var withheld_mean = other_means[0];
meanings.push(other_means[1]);
shuffle(meanings);
if (suff == "1"){
    raw_suffs = ["B", "D", "F", "P"];
    var all_suffs = raw_suffs.concat(["K"]);
    shuffle(raw_suffs);
    for (var i=0; i < raw_suffs.length; i++){
          suffix_to_meaning[raw_suffs[i]] = meanings[i];
          meaning_to_suffix[meanings[i]] = raw_suffs[i];
          meaning_string = meaning_string + raw_suffs[i]+"->"+meanings[i]+";";
    }
    suffix_to_meaning["K"] = withheld_mean;
    meaning_to_suffix[withheld_mean] = "K";
    meaning_string = meaning_string + "K->"+withheld_mean+";";
}
if (suff == "2") {
    raw_suffs = ["D", "F", "P", "K"];
    var all_suffs = raw_suffs.concat(["B"]);
    shuffle(raw_suffs);
    for (var i=0; i < raw_suffs.length; i++){
          suffix_to_meaning[raw_suffs[i]] = meanings[i];
          meaning_to_suffix[meanings[i]] = raw_suffs[i];
          meaning_string = meaning_string + raw_suffs[i]+"->"+meanings[i]+";";
    }
    suffix_to_meaning["B"] = withheld_mean;   
    meaning_to_suffix[withheld_mean] = "B";
    meaning_string = meaning_string + "B->"+withheld_mean+";";  
}


//Create the appropriate suffix/number combos for each audio file:
getTTcount = {
                      "1":
                            {
                              "B": {"B":{"FaithNoHarm":5,"Harm":5,"FaithNoPal":10}, "D":{"FaithNoHarm":5,"Harm":5,"Pal":10,"Inter":10}, "F":{"FaithNoHarm":5,"Harm":5,"FaithNoPal":10}, "P":{"FaithNoHarm":5,"Harm":5,"Pal":10,"Inter":10}},
                              "F":{"B":{"FaithNoHarm":5,"Harm":5,"FaithNoPal":10,"Inter":10}, "D":{"FaithNoHarm":5,"Harm":5,"Pal":10}, "F":{"FaithNoHarm":5,"Harm":5,"FaithNoPal":10,"Inter":10}, "P":{"FaithNoHarm":5,"Harm":5,"Pal":10}},
                              "CB":{"B":{"FaithNoHarm":5,"Harm":5,"FaithNoPal":10}, "D":{"FaithNoHarm":5,"Harm":5,"Pal":10,"Inter":10}, "F":{"FaithNoHarm":5,"Harm":5,"FaithNoPal":10}, "P":{"FaithNoHarm":5,"Harm":5,"Pal":10,"Inter":10}},
                              "CF":{"B":{"FaithNoHarm":5,"Harm":5,"FaithNoPal":10,"Inter":10}, "D":{"FaithNoHarm":5,"Harm":5,"Pal":10}, "F":{"FaithNoHarm":5,"Harm":5,"FaithNoPal":10,"Inter":10}, "P":{"FaithNoHarm":5,"Harm":5,"Pal":10}}
                             },
                       "2":
                            {
                              "B": {"D":{"FaithNoHarm":5,"Harm":5,"FaithNoPal":10}, "F":{"FaithNoHarm":5,"Harm":5,"Pal":10,"Inter":10}, "P":{"FaithNoHarm":5,"Harm":5,"FaithNoPal":10}, "K":{"FaithNoHarm":5,"Harm":5,"Pal":10,"Inter":10}},
                              "F":{"D":{"FaithNoHarm":5,"Harm":5,"FaithNoPal":10,"Inter":10}, "F":{"FaithNoHarm":5,"Harm":5,"Pal":10}, "P":{"FaithNoHarm":5,"Harm":5,"FaithNoPal":10,"Inter":10}, "K":{"FaithNoHarm":5,"Harm":5,"Pal":10}},
                              "CB":{"D":{"FaithNoHarm":5,"Harm":5,"FaithNoPal":10}, "F":{"FaithNoHarm":5,"Harm":5,"Pal":10,"Inter":10}, "P":{"FaithNoHarm":5,"Harm":5,"FaithNoPal":10}, "K":{"FaithNoHarm":5,"Harm":5,"Pal":10,"Inter":10}},
                              "CF":{"D":{"FaithNoHarm":5,"Harm":5,"FaithNoPal":10,"Inter":10}, "F":{"FaithNoHarm":5,"Harm":5,"Pal":10}, "P":{"FaithNoHarm":5,"Harm":5,"FaithNoPal":10,"Inter":10}, "K":{"FaithNoHarm":5,"Harm":5,"Pal":10}}
                             }
              };
var block_template = raw_suffs;
for (var suff_num = 0; suff_num < block_template.length; suff_num++){
    var this_suff = block_template[suff_num];
    var these_TTs = get_miniBlock_template[suff][lang][this_suff]
    trialInfo2Stem["Train"][this_suff] = {};
    for (var tt_num = 0; tt_num < these_TTs.length; tt_num++){
        var this_tt = these_TTs[tt_num];
        trialInfo2Stem["Train"][this_suff][this_tt] = get_numbers(getTTcount[suff][lang][this_suff][this_tt], [this_suff]);
    }
}


//HTML to use for audio playing:
var player_function_stem = "<script>function audioStartStem() {document.getElementById('stem_player').play();}</script>";
var player_function_1 = "<script>function audioEndPreA() {a = document.getElementById('option_A');a.style.color = 'red';a.style.fontWeight = 'bold';document.getElementById('a_player').play();}";
var player_function_2 = "function audioEndPostA() {a = document.getElementById('option_A');a.style.color = 'black';a.style.fontWeight = 'normal';document.getElementById('sil_2').play();}";
var player_function_3 = "function audioEndPreB() {b = document.getElementById('option_B');b.style.color = 'red';b.style.fontWeight = 'bold';document.getElementById('b_player').play();}";
var player_function_4 = "function audioEndPostB() {b = document.getElementById('option_B'); b.style.color = 'black';b.style.fontWeight = 'normal';}</script>";
var player_functions = player_function_1.concat(player_function_2).concat(player_function_3).concat(player_function_4);

var stem_silence = "<audio style='visibility:hidden;' id='sil_stem' controls autoplay onended='audioStartStem()'><source src='https://people.umass.edu/bprickett/Opacity_Denial/silence.wav'></audio>";
var silence_one = "<audio style='visibility:hidden;' id='sil_1' controls autoplay onended='audioEndPreA()'><source src='https://people.umass.edu/bprickett/Opacity_Denial/silence.wav'></audio>";
var silence_two = "<audio style='visibility:hidden;' id='sil_2' controls onended='audioEndPreB()'><source src='https://people.umass.edu/bprickett/Opacity_Denial/silence.wav'></audio>";
 
var all_audio = "<audio style='visibility:hidden;' controls><source src='https://people.umass.edu/bprickett/Opacity_Denial/silence.wav'></audio>";
    
//Arrays to build:
var train_bareStems = [];
var train_choices = [];
var intro_pages = [];
var break_pages = [];
var train_names = [];
var i = 0;

//Put everything together to create the pieces of the training phase:
for (var block_num = 0; block_num < train_block_num; block_num++){
    shuffle(block_template);
    for (var mb_num = 0; mb_num < block_template.length; mb_num ++){
        //Set up the beginning of the block:
        var this_suff = block_template[mb_num];
        var this_meaning = suffix_to_meaning[this_suff];
        var this_intro_page = [
                                   "mbIntro_"+block_num+"."+mb_num,
                                   "ComicCaption",
                                   {
                                       s:"",
                                       q:"<table><trd><td></td><td style='width:400;'><ul><li>The following set of trials will be teaching you how to say '<b>".concat(meaningToEnglish[this_meaning]).concat("</b>' in the alien language.</li><li>Remember, we're using pictures with an arrow like the one above to illustrate this meaning, and you won't need to memorize individual nouns.</li></ul></td><td></td></tr></table>"), html:"http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.png",
                                       mean:this_meaning, 
                                       hasCorrect:false, 
                                       as:["Ok"]
                                   }
                               ];
        intro_pages.push(this_intro_page);
        train_names.push("mbIntro_"+block_num+"."+mb_num);
               
        //Go mini-block by mini-block:
        var mb_template = get_miniBlock_template[suff][lang][block_template[mb_num]];
        shuffle(mb_template);
        for (var tt = 0; tt < mb_template.length; tt++){
            //Find the stem and corresponding picture for this trial:
            pic_file = pic_names.pop();
            stem_num = trialInfo2Stem["Train"][block_template[mb_num]][mb_template[tt]].pop()+"";
            if (stem_num == "undefined"){
                console.log("!!");
                console.log(block_template[mb_num]);
                console.log(mb_template[tt]);
            }
        
            //Make the name of the audio file:
            bareStem_file = "Train_".concat(mb_template[tt]).concat("_BareStem_").concat(stem_num).concat(".wav");
            correct_file = "Train_".concat(mb_template[tt]).concat("_CorrectChoice_").concat(stem_num).concat(".wav");
            incorrect_file = "Train_".concat(mb_template[tt]).concat("_IncorrectChoice_").concat(stem_num).concat(".wav");
        
            //Randomize which side the correct word happens on:
            var word_options = ["A", "B"]; 
            shuffle(word_options);
            var correct_word =  word_options[0];
        
            //Set up the stimulus pairs:
            if (correct_word == "A"){
                var audio_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='".concat(audio_dir).concat(correct_file).concat("' type='audio/wav'></audio>");
                var audio_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='".concat(audio_dir).concat(incorrect_file).concat("' type='audio/wav'></audio>");          
            }
            else {
                var audio_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='".concat(audio_dir).concat(incorrect_file).concat("' type='audio/wav'></audio>");
                var audio_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='".concat(audio_dir).concat(correct_file).concat("' type='audio/wav'></audio>");  
            }
            
            //Save these audio elements for preloading:
            all_audio = all_audio.concat("<audio style='visibility:hidden;' controls><source src='").concat(audio_dir).concat(bareStem_file).concat("' type='audio/wav'></audio>");
            all_audio = all_audio.concat("<audio style='visibility:hidden;' controls><source src='").concat(audio_dir).concat(correct_file).concat("' type='audio/wav'></audio>");
            all_audio = all_audio.concat("<audio style='visibility:hidden;' controls><source src='").concat(audio_dir).concat(incorrect_file).concat("' type='audio/wav'></audio>");
       
            //Build the two pages that have audio in them:
            var choices_html = silence_one.concat(silence_two).concat(audio_a).concat(audio_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the correct word for the above picture?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
            var picture_html = pic_dir.concat(pic_file);
            var stem_html = stem_silence.concat("<table align='center'><tr><td><img src='").concat(picture_html).concat("'></td></tr></table><p align='center'>The word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls id='stem_player' align='center'><source src='").concat(audio_dir).concat(bareStem_file).concat("' type='audio/wav'></audio></td></tr></table>").concat(player_function_stem);
        
            //Set up the item objects:
            train_bareStems.push(["train_stem_"+i, "my_Separator", {normalMessage:stem_html, errorMessage:"", transfer:3000}]);
            train_names.push("train_stem_"+i);
            train_choices.push(["train_choice_"+i, "ComicCaption", {s:"", q:choices_html, html:picture_html, mean:this_meaning, hasCorrect:correct_word, as:["A", "B"]}]);
            train_names.push("train_choice_"+i);
            train_names.push("feedback");
            //train_names.push("sep");
            i ++;
        }
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
    if (block_num == 1){
        var train_middle = train_names.length; //Keep track of where to break up the trianing phase
    }
            
}


//**************************************
// BUILD TESTING TRIALS
//***************************************
var block_template = ["FaithNoHarm", "FaithNoHarm",
                      "FaithNoPal", "FaithNoPal",
                      "Harm_old","Harm_old",
                      "Inter_old", "Inter_old",
                      "Pal", "Pal",
                      "Harm_newAff", "Harm_newAff","Harm_newAff","Harm_newAff","Harm_newAff",
                      "Inter_newAff", "Inter_newAff","Inter_newAff","Inter_newAff","Inter_newAff",
                      "Inter_newType", "Inter_newType","Inter_newType","Inter_newType","Inter_newType"
            ];

//Arrays to build:
var test_bareStems = [];
var test_choices = [];
var test_names = [];
var i = 0;

//Put everything together to create the pieces of the testing phase:
for (var block_num = 0; block_num < test_block_num; block_num++){
    shuffle(block_template);
    for (var tt = 0; tt < block_template.length; tt++){
        //Find the stem and corresponding picture for this trial:
        pic_file = pic_names.pop();
        stem_num = trialInfo2Stem["Test"][block_template[tt]].pop()+"";
        
        if (block_template[tt] == "Inter_newType"){
              bareStem_file = "Test_".concat(block_template[tt]).concat("_BareStem_").concat(stem_num).concat(".wav");
              correct_file = "Test_".concat(block_template[tt]).concat("_Both-Rules-ApplyingChoice_").concat(stem_num).concat(".wav");
              incorrect_file = "Test_".concat(block_template[tt]).concat("_JustHarmonizingChoice_").concat(stem_num).concat(".wav");
        }
        else{
              bareStem_file = "Test_".concat(block_template[tt]).concat("_BareStem_").concat(stem_num).concat(".wav");
              correct_file = "Test_".concat(block_template[tt]).concat("_CorrectChoice_").concat(stem_num).concat(".wav");
              incorrect_file = "Test_".concat(block_template[tt]).concat("_IncorrectChoice_").concat(stem_num).concat(".wav");
        }
        
        //Randomize which side the correct word happens on:
        var word_options = ["A", "B"]; 
        shuffle(word_options);
        var correct_word =  word_options[0];
        
        //Set up the stimulus pairs:
        if (correct_word == "A"){
            var audio_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='".concat(audio_dir).concat(correct_file).concat("' type='audio/wav'></audio>");
            var audio_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='".concat(audio_dir).concat(incorrect_file).concat("' type='audio/wav'></audio>");          
        }
        else {
            var audio_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='".concat(audio_dir).concat(incorrect_file).concat("' type='audio/wav'></audio>");
            var audio_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='".concat(audio_dir).concat(correct_file).concat("' type='audio/wav'></audio>");  
        }

        //Save these audio elements for preloading:
        all_audio = all_audio.concat("<audio style='visibility:hidden;' controls><source src='").concat(audio_dir).concat(bareStem_file).concat("' type='audio/wav'></audio>");
        all_audio = all_audio.concat("<audio style='visibility:hidden;' controls><source src='").concat(audio_dir).concat(correct_file).concat("' type='audio/wav'></audio>");
        all_audio = all_audio.concat("<audio style='visibility:hidden;' controls><source src='").concat(audio_dir).concat(incorrect_file).concat("' type='audio/wav'></audio>");

        //Build the two pages that have audio in them:
        var choices_html = silence_one.concat(silence_two).concat(audio_a).concat(audio_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the <b>most</b> correct word for the above picture?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
        var picture_html = pic_dir.concat(pic_file);
        var stem_html = stem_silence.concat("<table align='center'><tr><td><img src='").concat(picture_html).concat("'></td></tr></table><p align='center'>The word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls id='stem_player' align='center'><source src='").concat(audio_dir).concat(bareStem_file).concat("' type='audio/wav'></audio></td></tr></table>").concat(player_function_stem);
    
        //Figure out meaning (for arrow placement):
        var this_suff = stem_num.charAt(stem_num.search(/(P|D|K|B|F)_/i));
        var this_meaning = suffix_to_meaning[this_suff];
        
        //Set up the item objects:
        test_bareStems.push(["test_stem_"+i, "my_Separator", {normalMessage:stem_html, errorMessage:"", transfer:3000}]);
        test_names.push("test_stem_"+i);
        test_choices.push(["test_choice_"+i, "ComicCaption", {s:"", q:choices_html, html:picture_html, mean:this_meaning, hasCorrect:correct_word, as:["A", "B"]}]);
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


//**********************
// BUILD ITEMS ARRAY
//***********************

//Pieces of the "intro" screen:
instruct = "<div style='padding:50px;'><h1>Welcome!</h1><p>In this experiment, you will be asked to learn aspects of an imaginary 'alien' language. The experiment should take about an hour, but before we start, there are some important pieces of information that we need to go over first:</p><ul>";
headphones = "<li>Please be sure to wear headphones while participating.</li><li>Do not take notes of any kind during the experiment.</li>";
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
               ["headphone_check", "Form", {consentRequired: false, html:"<b>What kind of headphones are you using? (Please give the brand and model number)</b><br><br>"+'<textarea rows="3" cols="60" name="headphones" class="obligatory"></textarea><br><br>'}],
               ["compQ1", "Question", {q:"What browser should you avoid using?", hasCorrect:"Safari", as:["Safari", "Chrome"]}],
               ["comp_feedback", "my_Separator", {normalMessage:"<img src='https://people.umass.edu/bprickett/Opacity_Denial/Check_Pic.png'>", errorMessage:"<img src='https://people.umass.edu/bprickett/Opacity_Denial/X_pic.png'>", transfer:1500, ignoreFailure: false}],
               ["sep", "Separator", {normalMessage:"Press any key to continue.", errorMessage:"Press any key to continue.", transfer:"keypress", ignoreFailure: true}],
               ["feedback", "my_Separator", {normalMessage:"<table><tr><td><img src='https://people.umass.edu/bprickett/Opacity_Denial/alien_face_happy.png'></td><td><img src='https://people.umass.edu/bprickett/Opacity_Denial/Check_Pic.png'></td></tr></table>", errorMessage:"<table><tr><td><img src='https://people.umass.edu/bprickett/Opacity_Denial/alien_face_confused.png'></td><td><img src='https://people.umass.edu/bprickett/Opacity_Denial/X_pic.png'></td></tr></table>", transfer:1500, ignoreFailure: false}],
               ["human_feedback", "my_Separator", {normalMessage:"<table><tr><td><img src='https://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/human_face_happy.png'></td><td><img src='https://people.umass.edu/bprickett/Opacity_Denial/Check_Pic.png'></td></tr></table>", errorMessage:"<table><tr><td><img src='https://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/human_face_confused.png'></td><td><img src='https://people.umass.edu/bprickett/Opacity_Denial/X_pic.png'></td></tr></table>", transfer:1500, ignoreFailure: false}],
             ];
        
items.push([
                   "Instr0",
                   "Message",
                   {html:  
                          "<h1>Practice and Instructions</h1>"
                          +"<p>We will now walk through a few screens of instructions and practice trials. There will be some comprehension "
                          +"questions along the way to make sure you have understood the instructions. So please read carefully!</p>"
                    }
            ]);
    
items.push([
                   "Instr1",
                   "Message",
                   {html:  
                          "<h1>How you'll learn...</h1>"
                          +"<p>In this experiment you will learn how to give directions."
                          +" Each trial will be structured like this:</p>"
                          +"<ul><li>First, you'll see a picture of a noun and hear how it is pronounced when it's by itself.</li>"
                          +"<li>Then, you'll see the same noun with an arrow that points either <u>above, below, in front of, to the right of, or to the left</u> of the picture."
                          +"</li><li>Your job is to learn how to describe the location of the arrow for each noun.</li></ul>"
                    }
            ]); 
 items.push(["compQ2", "Question", {q:"Where will the arrow never appear?", hasCorrect:"Behind the noun", as:["Behind the noun", "Above the noun"]}]);
 
 items.push([
                   "Instr2", 
                   "Message", 
                   {html: 
                          "<h1>Giving Directions</h1>"
                          +"<p>On each trial, you will choose between two ways of giving directions:</p>"
                          +"<ul><li>You'll hear two audio clips in a random order: one will give correct directions and one will give incorrect ones.</li>"
                          +"<li>Click the left button (labeled ‘A’) if you think the first clip is correct</li>"
                          +"<li>Click the right button (labeled ‘B’) if you think the second clip is correct</li></ul>"
                   }
             ]);
  items.push([
                  "SuffixURIntro",
                  "Message",
                  {html:
                          "<h1>Practice in English</h1>"
                          +"<p>Before you start giving directions in the alien language, we'll give you a few trials in English to try things out."
                          +" To help you with this, we've provided you with a friend (pictured below) who can tell you whether you're right or wrong after you make each choice.</p>"
                          +"<img src='https://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/human_face_happy.png'>"
                   }
              ]);

//Save some more audio fro preloading:
all_audio = all_audio.concat("<audio style='visibility:hidden;' controls><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/above_ball_right.wav' type='audio/wav'></audio>");
all_audio = all_audio.concat("<audio style='visibility:hidden;' controls><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/left_ball_right.wav' type='audio/wav'></audio>");
all_audio = all_audio.concat("<audio style='visibility:hidden;' controls><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/right_ball_right.wav' type='audio/wav'></audio>");
all_audio = all_audio.concat("<audio style='visibility:hidden;' controls><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.wav' type='audio/wav'></audio>");
all_audio = all_audio.concat("<audio style='visibility:hidden;' controls><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/below_ball_right.wav' type='audio/wav'></audio>");
all_audio = all_audio.concat("<audio style='visibility:hidden;' controls><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/front_ball_right.wav' type='audio/wav'></audio>");
all_audio = all_audio.concat("<audio style='visibility:hidden;' controls><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/above_ball_wrong.wav' type='audio/wav'></audio>");
all_audio = all_audio.concat("<audio style='visibility:hidden;' controls><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/left_ball_wrong.wav' type='audio/wav'></audio>");
all_audio = all_audio.concat("<audio style='visibility:hidden;' controls><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/right_ball_wrong.wav' type='audio/wav'></audio>");
all_audio = all_audio.concat("<audio style='visibility:hidden;' controls><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/below_ball_wrong.wav' type='audio/wav'></audio>");
all_audio = all_audio.concat("<audio style='visibility:hidden;' controls><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/front_ball_wrong.wav' type='audio/wav'></audio>");     
    
//English suffix UR Q1    
var suffUR1_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/above_ball_right.wav' type='audio/wav'></audio>";
var suffUR1_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/left_ball_right.wav' type='audio/wav'></audio>";                   
 
var suffUR1_choices_html = silence_one.concat(silence_two).concat(suffUR1_a).concat(suffUR1_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the correct description of the picture above?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
var suffUR1_stem_html = stem_silence.concat("<table align='center'><tr><td><img src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.png'></td></tr></table><p align='center'>The word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls id='stem_player' align='center'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.wav' type='audio/wav'></audio></td></tr></table>").concat(player_function_stem);
       
items.push(["suffUR_stem_1", "my_Separator", {normalMessage:suffUR1_stem_html, errorMessage:"", transfer:2500}]);
items.push(["suffUR_choice_1", "ComicCaption", {s:"", q:suffUR1_choices_html, html:"http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.png", mean:"L", face:"human", hasCorrect:"B", as:["A", "B"]}]);
    
//English suffix UR Q2    
var suffUR2_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/above_ball_right.wav' type='audio/wav'></audio>";
var suffUR2_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/below_ball_right.wav' type='audio/wav'></audio>";                   
    
var suffUR2_choices_html = silence_one.concat(silence_two).concat(suffUR2_a).concat(suffUR2_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the correct description of the picture above?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
var suffUR2_stem_html = stem_silence.concat("<table align='center'><tr><td><img src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.png'></td></tr></table><p align='center'>The word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls id='stem_player' align='center'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.wav' type='audio/wav'></audio></td></tr></table>").concat(player_function_stem);
       
items.push(["suffUR_stem_2", "my_Separator", {normalMessage:suffUR2_stem_html, errorMessage:"", transfer:2500}]);
items.push(["suffUR_choice_2", "ComicCaption", {s:"", q:suffUR2_choices_html, html:"http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.png", mean:"T", face:"human", hasCorrect:"A", as:["A", "B"]}]);
 
//English suffix UR Q3    
var suffUR3_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/front_ball_right.wav' type='audio/wav'></audio>";
var suffUR3_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/right_ball_right.wav' type='audio/wav'></audio>";                   

var suffUR3_choices_html = silence_one.concat(silence_two).concat(suffUR3_a).concat(suffUR3_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the correct description of the picture above?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
var suffUR3_stem_html = stem_silence.concat("<table align='center'><tr><td><img src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.png'></td></tr></table><p align='center'>The word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls id='stem_player' align='center'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.wav' type='audio/wav'></audio></td></tr></table>").concat(player_function_stem);
       
items.push(["suffUR_stem_3", "my_Separator", {normalMessage:suffUR3_stem_html, errorMessage:"", transfer:2500}]);
items.push(["suffUR_choice_3", "ComicCaption", {s:"", q:suffUR3_choices_html, html:"http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.png", mean:"F", face:"human", hasCorrect:"A", as:["A", "B"]}]);
 
//English suffix UR Q14   
var suffUR4_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/left_ball_right.wav' type='audio/wav'></audio>";
var suffUR4_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/below_ball_right.wav' type='audio/wav'></audio>";                   
        
var suffUR4_choices_html = silence_one.concat(silence_two).concat(suffUR4_a).concat(suffUR4_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the correct description of the picture above?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
var suffUR4_stem_html = stem_silence.concat("<table align='center'><tr><td><img src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.png'></td></tr></table><p align='center'>The word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls id='stem_player' align='center'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.wav' type='audio/wav'></audio></td></tr></table>").concat(player_function_stem);
       
items.push(["suffUR_stem_4", "my_Separator", {normalMessage:suffUR4_stem_html, errorMessage:"", transfer:2500}]);
items.push(["suffUR_choice_4", "ComicCaption", {s:"", q:suffUR4_choices_html, html:"http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.png", mean:"B", face:"human", hasCorrect:"B", as:["A", "B"]}]);
 
//English suffix UR Q5    
var suffUR5_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/right_ball_right.wav' type='audio/wav'></audio>";
var suffUR5_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/left_ball_right.wav' type='audio/wav'></audio>";                   
        
var suffUR5_choices_html = silence_one.concat(silence_two).concat(suffUR5_a).concat(suffUR5_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the correct description of the picture above?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
var suffUR5_stem_html = stem_silence.concat("<table align='center'><tr><td><img src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.png'></td></tr></table><p align='center'>The word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls id='stem_player' align='center'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.wav' type='audio/wav'></audio></td></tr></table>").concat(player_function_stem);
       
items.push(["suffUR_stem_5", "my_Separator", {normalMessage:suffUR5_stem_html, errorMessage:"", transfer:2500}]);
items.push(["suffUR_choice_5", "ComicCaption", {s:"", q:suffUR5_choices_html, html:"http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.png", mean:"R", face:"human", hasCorrect:"A", as:["A", "B"]}]);

//Learning the affixes
items.push([
                   "Instr3", 
                   "Message", 
                   {html: 
                         "<h1>Learning Suffixes</h1>"+
                         "<p>Languages have suffixes that are added to the end of words to change their meaning. "+
                         "For example, in English, we usually make nouns plural by adding ‘-s’ to them:</p>"+
                         "<ul><li>'cat' &rarr; 'cat<b><u>s</u></b>'</li><li>'dog' &rarr; 'dog<b><u>s</u></b>'</li><li>'apple' &rarr; 'apple<b><u>s</u></b>'</li></ul>"
                     }
             ]);
items.push(["compQ3", "Question", {q:"What suffix in English is usually added to plural nouns?", hasCorrect:"'-s'", as:["'-ed'", "'-s'"]}]);
     
        
   
//More instructions for suffix UR's:
items.push([
                   "Instr4", 
                   "Message", 
                   {html: 
                          "<h1>Learning Alien Suffixes</h1>"
                          +"<p>In the alien language, suffixes are used to give directions. You'll now learn the meanings for 5 such suffixes which will be attached to 8 different words.</p>"
                          +"<p>Instead of a human helping you, this time you'll have an alien friend (pictured below) who can tell you whether you're right or wrong after you make each choice.</p>"
                          +"<img src='https://people.umass.edu/bprickett/Opacity_Denial/alien_face_happy.png'>"
                   }
             ]); 
 items.push([
                   "Instr_2ndURPhase", 
                   "Message", 
                   {html: 
                          "<h1>Learning Alien Suffixes (Part 2)</h1>"
                          +"<p>Nice job! It's been a while since you practiced the meanings of the alien suffixes. During the next 40 trials, you'll get to demonstrate your knowledge of the 5 suffixes' meanings like you did at the beginning of the experiment.</p>"
                          +"<p>You'll still have your alien friend (pictured below) telling you whether you're right or wrong after you make each choice.</p>"
                          +"<img src='https://people.umass.edu/bprickett/Opacity_Denial/alien_face_happy.png'>"
                   }
             ]); 
 items.push([
                   "End_2ndURPhase", 
                   "Message", 
                   {html: 
                          "<h1>Back to Pronunciations</h1>"
                          +"<p>Now that you've refreshed your memory regarding the meanings of the alien suffixes, you're ready to continue learning their pronunciations.</p>"
                          +"<p>Remember, there's only ".concat(train_block_num).concat(" blocks of training, and you've already finished 2! Keep up the good work!</p>")
                   }
             ]); 
 
//Make alien suffix UR questions: 
//(Note that URdict has the II's and I's switched so this phase has different stems than the next. 
var UR_names = [];  
var get_opp_head = {"I":"II", "II":"I"};
var opp_head = get_opp_head[head];
for (var stem_i = 0; stem_i < ur_pics.length; stem_i++){
    var this_pic = ur_pics[stem_i];
    for (var suff_j = 0; suff_j < all_suffs.length; suff_j++){
        correct_meaning = suffix_to_meaning[all_suffs[suff_j]];
        
        bare_url = "http://people.umass.edu/bprickett/Opacity_Denial/Suffix_UR_Phase/Audio_Files/Lang=".concat(lang).concat("_Stem=").concat(opp_head).concat("_SuffSet=").concat(suff).concat("_suffix=").concat(all_suffs[suff_j]).concat("_bareStem_").concat(stem_i).concat(".wav");
        right_url = "http://people.umass.edu/bprickett/Opacity_Denial/Suffix_UR_Phase/Audio_Files/Lang=".concat(lang).concat("_Stem=").concat(opp_head).concat("_SuffSet=").concat(suff).concat("_suffix=").concat(all_suffs[suff_j]).concat("_correct_").concat(stem_i).concat(".wav");   
        wrong_url = "http://people.umass.edu/bprickett/Opacity_Denial/Suffix_UR_Phase/Audio_Files/Lang=".concat(lang).concat("_Stem=").concat(opp_head).concat("_SuffSet=").concat(suff).concat("_suffix=").concat(all_suffs[suff_j]).concat("_wrong_").concat(stem_i).concat(".wav");
           
        var answers = [0, 1];
        shuffle(answers);
        var this_ans = answers[0];
        
        if (this_ans == 0){
            var this_choice_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='".concat(right_url).concat("' type='audio/wav'></audio>");
            var this_choice_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='".concat(wrong_url).concat("' type='audio/wav'></audio>");
        } 
        if (this_ans == 1){
            var this_choice_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='".concat(wrong_url).concat("' type='audio/wav'></audio>");
            var this_choice_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='".concat(right_url).concat("' type='audio/wav'></audio>");
        }        
     
        //Save these audio elements for preloading:
        all_audio = all_audio.concat("<audio style='visibility:hidden;' controls><source src='").concat(bare_url).concat("' type='audio/wav'></audio>");
        all_audio = all_audio.concat("<audio style='visibility:hidden;' controls><source src='").concat(right_url).concat("' type='audio/wav'></audio>");
        all_audio = all_audio.concat("<audio style='visibility:hidden;' controls><source src='").concat(wrong_url).concat("' type='audio/wav'></audio>");
        
        var suffUR_choices_html = silence_one.concat(silence_two).concat(this_choice_a).concat(this_choice_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the correct description of the picture above?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
        var suffUR_stem_html = stem_silence.concat("<table align='center'><tr><td><img src='http://people.umass.edu/bprickett/Opacity_Denial/Suffix_UR_Phase/").concat(this_pic).concat("'></td></tr></table><p align='center'>The word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls id='stem_player' align='center'><source src='").concat(bare_url).concat("' type='audio/wav'></audio></td></tr></table>").concat(player_function_stem);
       
        items.push(["alien_suffUR_stem_"+stem_i+""+all_suffs[suff_j], "my_Separator", {normalMessage:suffUR_stem_html, errorMessage:"", transfer:2500}]);
        items.push(["alien_suffUR_choice_"+stem_i+""+all_suffs[suff_j], "ComicCaption", {s:"", q:suffUR_choices_html, html:"http://people.umass.edu/bprickett/Opacity_Denial/Suffix_UR_Phase/".concat(this_pic), mean:correct_meaning, face:"alien", hasCorrect:this_ans, as:["A", "B"]}]);
        UR_names.push("alien_suffUR_stem_"+stem_i+""+all_suffs[suff_j]);
        UR_names.push("alien_suffUR_choice_"+stem_i+""+all_suffs[suff_j]);
        UR_names.push("feedback"); 
     }                                                                                                                                                                                      
}
    
//Linguistics lesson pages:
items.push([
                   "Instr5", 
                   "Message", 
                   {html: 
                         "<h1>Learning Correct Suffix Pronunciations</h1>"+
                         "<p>Now that you've learned the <i>meaning</i> of the alien suffixes, you'll now learn how to pronounce them in different contexts."+
                         " In many languages, how a suffix sounds depends on the word it attaches to. "+
                         "For example, the English plural suffix, '-s', is pronounced differently in different words:</p>"+
                         "<ul><li>In 'cat<b><u>s</u></b>' the plural suffix makes a standard 's' sound.</li><li>But in 'dog<b><u>s</u></b>', it makes a 'z' sound.</li></ul>"
                         
                   }
             ]);
items.push(["compQ4", "Question", {q:"What kind of sound does the plural suffix make in 'dogs'?", hasCorrect:"A 'z' sound", as:["An 's' sound", "A 'z' sound"]}]);
   
items.push([
                   "Instr6", 
                   "Message", 
                   {html: 
                         "<h1>Learning Correct Word Pronunciations</h1>"+
                         "<p>Words can sometimes also undergo changes in pronunciation when suffixes are attached to them. "+
                         "For example, in English, to make the plural form of 'life', an 'f' sound changes into a 'v'. Other words do this too:</p>"+
                         "<ul><li>'li<u>f</u>e' &rarr; 'li<b><u>v</b></u>es'</li><li>'hoo<u>f</u>' &rarr; 'hoo<b><u>v</b></u>es' </li><li>'lea<u>f</u>' &rarr; 'lea<u><b>v</u></b>es'</li></ul>"+
                         "<p>In this experiment, it will also be important to pay attention to how words in the alien language sound when "+
                         "one of the five suffixes is added to them.</p>"
                   }
             ]);
items.push(["compQ5", "Question", {q:"Which noun changes its 'f' to a 'v' when a plural suffix is added to it?", hasCorrect:"Life", as:["Life", "Cat"]}]);

        
//English Practice Questions
//Add practice intro to items list:      
items.push(["practice_intro", "Message", 
                   {
                       html: "<h1>Pronunciation Practice</h1><div>"
                             +"<p>Soon you'll start learning how to correctly pronounce words and suffixes in the alien language. But before you do that, let's start with some more practice questions in English so that you can get the hang of this new task.</p>"
                             +"<p>To help you with this, your human friend (pictured below) has returned to give you more feedback on your choices.</p>"
                             +"<img src='https://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/human_face_happy.png'></div>"
                   }
            ]);
      
//Q1: English Ball+Left
var pq1_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/left_ball_wrong.wav' type='audio/wav'></audio>";
var pq1_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/left_ball_right.wav' type='audio/wav'></audio>";                   
        
var pq1_choices_html = silence_one.concat(silence_two).concat(pq1_a).concat(pq1_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the correct description of the picture above?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
var pq1_stem_html = stem_silence.concat("<table align='center'><tr><td><img src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.png'></td></tr></table><p align='center'>The word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls id='stem_player' align='center'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.wav' type='audio/wav'></audio></td></tr></table>").concat(player_function_stem);
        
items.push(["pq_stem_1", "my_Separator", {normalMessage:pq1_stem_html, errorMessage:"", transfer:2500}]);
items.push(["pq_choice_1", "ComicCaption", {s:"", q:pq1_choices_html, html:"http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.png", mean:"L", face:"human", hasCorrect:"B", as:["A", "B"]}]);

//Q2: English Ball+Right
var pq2_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/right_ball_right.wav' type='audio/wav'></audio>";        
var pq2_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/right_ball_wrong.wav' type='audio/wav'></audio>";                   
        
var pq2_choices_html = silence_one.concat(silence_two).concat(pq2_a).concat(pq2_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the correct description of the picture above?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
var pq2_stem_html = stem_silence.concat("<table align='center'><tr><td><img src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.png'></td></tr></table><p align='center'>The word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls id='stem_player' align='center'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.wav' type='audio/wav'></audio></td></tr></table>").concat(player_function_stem);
          
items.push(["pq_stem_2", "my_Separator", {normalMessage:pq2_stem_html, errorMessage:"", transfer:2500}]);
items.push(["pq_choice_2", "ComicCaption", {s:"", q:pq2_choices_html, html:"http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.png", mean:"R", face:"human", hasCorrect:"A", as:["A", "B"]}]);
   
//Q3: English Ball+Top/Above
var pq3_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/above_ball_right.wav' type='audio/wav'></audio>";        
var pq3_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/above_ball_wrong.wav' type='audio/wav'></audio>";                   
        
var pq3_choices_html = silence_one.concat(silence_two).concat(pq3_a).concat(pq3_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the correct description of the picture above?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
var pq3_stem_html = stem_silence.concat("<table align='center'><tr><td><img src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.png'></td></tr></table><p align='center'>The word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls id='stem_player' align='center'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.wav' type='audio/wav'></audio></td></tr></table>").concat(player_function_stem);
         
items.push(["pq_stem_3", "my_Separator", {normalMessage:pq3_stem_html, errorMessage:"", transfer:2500}]);
items.push(["pq_choice_3", "ComicCaption", {s:"", q:pq3_choices_html, html:"http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.png", mean:"T", face:"human", hasCorrect:"A", as:["A", "B"]}]);
  
//Q4: English Ball+Below
var pq4_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/below_ball_wrong.wav' type='audio/wav'></audio>";        
var pq4_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/below_ball_right.wav' type='audio/wav'></audio>";                   
        
var pq4_choices_html = silence_one.concat(silence_two).concat(pq4_a).concat(pq4_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the correct description of the picture above?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
var pq4_stem_html = stem_silence.concat("<table align='center'><tr><td><img src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.png'></td></tr></table><p align='center'>The word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls id='stem_player' align='center'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.wav' type='audio/wav'></audio></td></tr></table>").concat(player_function_stem);
          
items.push(["pq_stem_4", "my_Separator", {normalMessage:pq4_stem_html, errorMessage:"", transfer:2500}]);
items.push(["pq_choice_4", "ComicCaption", {s:"", q:pq4_choices_html, html:"http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.png", mean:"B", face:"human", hasCorrect:"B", as:["A", "B"]}]);

//Q5: English Ball+In Front
var pq5_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/front_ball_right.wav' type='audio/wav'></audio>";        
var pq5_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/front_ball_wrong.wav' type='audio/wav'></audio>";                   
        
var pq5_choices_html = silence_one.concat(silence_two).concat(pq5_a).concat(pq5_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the correct description of the picture above?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
var pq5_stem_html = stem_silence.concat("<table align='center'><tr><td><img src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.png'></td></tr></table><p align='center'>The word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls id='stem_player' align='center'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.wav' type='audio/wav'></audio></td></tr></table>").concat(player_function_stem);
         
items.push(["pq_stem_5", "my_Separator", {normalMessage:pq5_stem_html, errorMessage:"", transfer:2500}]);
items.push(["pq_choice_5", "ComicCaption", {s:"", q:pq5_choices_html, html:"http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.png", mean:"F", face:"human", hasCorrect:"A", as:["A", "B"]}]);

//Q6: English Leaf+Left
var pq6_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/left_leaf_wrong.wav' type='audio/wav'></audio>";
var pq6_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/left_leaf_right.wav' type='audio/wav'></audio>";                   
        
var pq6_choices_html = silence_one.concat(silence_two).concat(pq6_a).concat(pq6_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the correct description of the picture above?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
var pq6_stem_html = stem_silence.concat("<table align='center'><tr><td><img src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/leaf.png'></td></tr></table><p align='center'>The word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls id='stem_player' align='center'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/leaf.wav' type='audio/wav'></audio></td></tr></table>").concat(player_function_stem);
        
items.push(["pq_stem_6", "my_Separator", {normalMessage:pq6_stem_html, errorMessage:"", transfer:2500}]);
items.push(["pq_choice_6", "ComicCaption", {s:"", q:pq6_choices_html, html:"http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/leaf.png", mean:"L", face:"human", hasCorrect:"B", as:["A", "B"]}]);

//Q7: English Leaf+Right
var pq7_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/right_leaf_right.wav' type='audio/wav'></audio>";        
var pq7_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/right_leaf_wrong.wav' type='audio/wav'></audio>";                   
        
var pq7_choices_html = silence_one.concat(silence_two).concat(pq7_a).concat(pq7_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the correct description of the picture above?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
var pq7_stem_html = stem_silence.concat("<table align='center'><tr><td><img src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/leaf.png'></td></tr></table><p align='center'>The word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls id='stem_player' align='center'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/leaf.wav' type='audio/wav'></audio></td></tr></table>").concat(player_function_stem);
          
items.push(["pq_stem_7", "my_Separator", {normalMessage:pq7_stem_html, errorMessage:"", transfer:2500}]);
items.push(["pq_choice_7", "ComicCaption", {s:"", q:pq7_choices_html, html:"http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/leaf.png", mean:"R", face:"human", hasCorrect:"A", as:["A", "B"]}]);
   
//Q8: English Leaf+Top/Above
var pq8_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/above_leaf_right.wav' type='audio/wav'></audio>";        
var pq8_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/above_leaf_wrong.wav' type='audio/wav'></audio>";                   
        
var pq8_choices_html = silence_one.concat(silence_two).concat(pq8_a).concat(pq8_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the correct description of the picture above?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
var pq8_stem_html = stem_silence.concat("<table align='center'><tr><td><img src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/leaf.png'></td></tr></table><p align='center'>The word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls id='stem_player' align='center'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/leaf.wav' type='audio/wav'></audio></td></tr></table>").concat(player_function_stem);
         
items.push(["pq_stem_8", "my_Separator", {normalMessage:pq8_stem_html, errorMessage:"", transfer:2500}]);
items.push(["pq_choice_8", "ComicCaption", {s:"", q:pq8_choices_html, html:"http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/leaf.png", mean:"T", face:"human", hasCorrect:"A", as:["A", "B"]}]);
  
//Q9: English Leaf+Below
var pq9_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/below_leaf_wrong.wav' type='audio/wav'></audio>";        
var pq9_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/below_leaf_right.wav' type='audio/wav'></audio>";                   
        
var pq9_choices_html = silence_one.concat(silence_two).concat(pq9_a).concat(pq9_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the correct description of the picture above?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
var pq9_stem_html = stem_silence.concat("<table align='center'><tr><td><img src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/leaf.png'></td></tr></table><p align='center'>The word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls id='stem_player' align='center'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/leaf.wav' type='audio/wav'></audio></td></tr></table>").concat(player_function_stem);
          
items.push(["pq_stem_9", "my_Separator", {normalMessage:pq9_stem_html, errorMessage:"", transfer:2500}]);
items.push(["pq_choice_9", "ComicCaption", {s:"", q:pq9_choices_html, html:"http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/leaf.png", mean:"B", face:"human", hasCorrect:"B", as:["A", "B"]}]);

//Q10: English Leaf+In Front
var pq10_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/front_leaf_right.wav' type='audio/wav'></audio>";        
var pq10_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/front_leaf_wrong.wav' type='audio/wav'></audio>";                   
        
var pq10_choices_html = silence_one.concat(silence_two).concat(pq10_a).concat(pq10_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the correct description of the picture above?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
var pq10_stem_html = stem_silence.concat("<table align='center'><tr><td><img src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/leaf.png'></td></tr></table><p align='center'>The word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls id='stem_player' align='center'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/leaf.wav' type='audio/wav'></audio></td></tr></table>").concat(player_function_stem);
         
items.push(["pq_stem_10", "my_Separator", {normalMessage:pq10_stem_html, errorMessage:"", transfer:2500}]);
items.push(["pq_choice_10", "ComicCaption", {s:"", q:pq10_choices_html, html:"http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/leaf.png", mean:"F", face:"human", hasCorrect:"A", as:["A", "B"]}]);
 
//Add practice middle to items list:      
items.push(["practice_mid", "Message", 
                   {
                       html: "<h1>Alien Pronunciation Practice...</h1><div><p>Nice work! Now you'll get to practice learning pronunciations in the alien language.</p>"
                             +"<p>To help you with this, your alien friend (pictured below) is back and will tell you whether you're right or wrong for each of the questions."
                             +" Remember to pay close attention to how the suffixes and words are pronounced, and don't worry if you're wrong a lot at first. You'll have to learn by trial and error</p>"
                             +"<img src='https://people.umass.edu/bprickett/Opacity_Denial/alien_face_happy.png'></div>"
                   }
            ]);
        
//Alien Practice Questions
var get_right_vowel = {
                  "1": {"b":"e", "d":"i", "f":"eh", "p":"ih", "k":"?"},
                  "2": {"d":"e", "f":"i", "p":"eh", "k":"ih", "b":"?"}        
                 };  
var get_wrong_vowel = {
                  "1": {"b":"i", "d":"e", "f":"ih", "p":"eh"},
                  "2": {"d":"i", "f":"e", "p":"ih", "k":"eh"}        
                 };  
        
//Q11: Alien Ball(dagak)+Right
var my_suff_c = meaning_to_suffix["R"].toLowerCase();
var my_suff_rightV = get_right_vowel[suff][my_suff_c];
if (my_suff_rightV == "?"){
    if (lang == "F" || lang == "CF"){
        my_suff_rightV = "e";
        my_suff_wrongV = "i";   
    }
    if (lang == "B" || lang == "CB"){
        my_suff_rightV = "i";
        my_suff_wrongV = "e";   
    }
}
else {
    var my_suff_wrongV = get_wrong_vowel[suff][my_suff_c];   
}
var my_correct_word = "alien_dagak"+my_suff_rightV+my_suff_c;
var my_wrong_word = "alien_dagak"+my_suff_wrongV+my_suff_c;

var pq11_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/".concat(my_correct_word).concat(".wav' type='audio/wav'></audio>");
var pq11_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/".concat(my_wrong_word).concat(".wav' type='audio/wav'></audio>");                  
        
var pq11_choices_html = silence_one.concat(silence_two).concat(pq11_a).concat(pq11_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the correct description of the picture above?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
var pq11_stem_html = stem_silence.concat("<table align='center'><tr><td><img src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.png'></td></tr></table><p align='center'>The word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls id='stem_player' align='center'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/dagak.wav' type='audio/wav'></audio></td></tr></table>").concat(player_function_stem);
        
items.push(["pq_stem_11", "my_Separator", {normalMessage:pq11_stem_html, errorMessage:"", transfer:2500}]);
items.push(["pq_choice_11", "ComicCaption", {s:"", q:pq11_choices_html, html:"http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.png", mean:"R", hasCorrect:"A", as:["A", "B"]}]);

//Q12: Alien Ball(dagak)+Left
var my_suff_c = meaning_to_suffix["L"].toLowerCase();
var my_suff_rightV = get_right_vowel[suff][my_suff_c];
if (my_suff_rightV == "?"){
    if (lang == "F" || lang == "CF"){
        my_suff_rightV = "e";
        my_suff_wrongV = "i";   
    }
    if (lang == "B" || lang == "CB"){
        my_suff_rightV = "i";
        my_suff_wrongV = "e";   
    }
}
else {
    var my_suff_wrongV = get_wrong_vowel[suff][my_suff_c];   
}
var my_correct_word = "alien_dagak"+my_suff_rightV+my_suff_c;
var my_wrong_word = "alien_dagak"+my_suff_wrongV+my_suff_c;
        
var pq12_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/".concat(my_correct_word).concat(".wav' type='audio/wav'></audio>");
var pq12_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/".concat(my_wrong_word).concat(".wav' type='audio/wav'></audio>");                   
     
var pq12_choices_html = silence_one.concat(silence_two).concat(pq12_a).concat(pq12_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the correct description of the picture above?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
var pq12_stem_html = stem_silence.concat("<table align='center'><tr><td><img src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.png'></td></tr></table><p align='center'>The word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls id='stem_player' align='center'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/dagak.wav' type='audio/wav'></audio></td></tr></table>").concat(player_function_stem);
          
items.push(["pq_stem_12", "my_Separator", {normalMessage:pq12_stem_html, errorMessage:"", transfer:2500}]);
items.push(["pq_choice_12", "ComicCaption", {s:"", q:pq12_choices_html, html:"http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.png", mean:"L", hasCorrect:"A", as:["A", "B"]}]);
   
//Q13: Alien Ball(dagak)+In Front
var my_suff_c = meaning_to_suffix["F"].toLowerCase();
var my_suff_rightV = get_right_vowel[suff][my_suff_c];
if (my_suff_rightV == "?"){
    if (lang == "F" || lang == "CF"){
        my_suff_rightV = "e";
        my_suff_wrongV = "i";   
    }
    if (lang == "B" || lang == "CB"){
        my_suff_rightV = "i";
        my_suff_wrongV = "e";   
    }
}
else {
    var my_suff_wrongV = get_wrong_vowel[suff][my_suff_c];   
}
var my_correct_word = "alien_dagak"+my_suff_rightV+my_suff_c;
var my_wrong_word = "alien_dagak"+my_suff_wrongV+my_suff_c;
        
var pq13_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/".concat(my_wrong_word).concat(".wav' type='audio/wav'></audio>");
var pq13_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/".concat(my_correct_word).concat(".wav' type='audio/wav'></audio>");                   
        
var pq13_choices_html = silence_one.concat(silence_two).concat(pq13_a).concat(pq13_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the correct description of the picture above?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
var pq13_stem_html = stem_silence.concat("<table align='center'><tr><td><img src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.png'></td></tr></table><p align='center'>The word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls id='stem_player' align='center'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/dagak.wav' type='audio/wav'></audio></td></tr></table>").concat(player_function_stem);
         
items.push(["pq_stem_13", "my_Separator", {normalMessage:pq13_stem_html, errorMessage:"", transfer:2500}]);
items.push(["pq_choice_13", "ComicCaption", {s:"", q:pq13_choices_html, html:"http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.png", mean:"F", hasCorrect:"B", as:["A", "B"]}]);
  
//Q14: Alien Ball(dagak)+Below
var my_suff_c = meaning_to_suffix["B"].toLowerCase();
var my_suff_rightV = get_right_vowel[suff][my_suff_c];
if (my_suff_rightV == "?"){
    if (lang == "F" || lang == "CF"){
        my_suff_rightV = "e";
        my_suff_wrongV = "i";   
    }
    if (lang == "B" || lang == "CB"){
        my_suff_rightV = "i";
        my_suff_wrongV = "e";   
    }
}
else {
    var my_suff_wrongV = get_wrong_vowel[suff][my_suff_c];   
}
var my_correct_word = "alien_dagak"+my_suff_rightV+my_suff_c;
var my_wrong_word = "alien_dagak"+my_suff_wrongV+my_suff_c;
        
var pq14_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/".concat(my_wrong_word).concat(".wav' type='audio/wav'></audio>");
var pq14_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/".concat(my_correct_word).concat(".wav' type='audio/wav'></audio>");                  
       
var pq14_choices_html = silence_one.concat(silence_two).concat(pq14_a).concat(pq14_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the correct description of the picture above?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
var pq14_stem_html = stem_silence.concat("<table align='center'><tr><td><img src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.png'></td></tr></table><p align='center'>The word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls id='stem_player' align='center'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/dagak.wav' type='audio/wav'></audio></td></tr></table>").concat(player_function_stem);
          
items.push(["pq_stem_14", "my_Separator", {normalMessage:pq14_stem_html, errorMessage:"", transfer:2500}]);
items.push(["pq_choice_14", "ComicCaption", {s:"", q:pq14_choices_html, html:"http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.png", mean:"B", hasCorrect:"B", as:["A", "B"]}]);

//Q15: Alien Ball(dagak)+Top
var my_suff_c = meaning_to_suffix["T"].toLowerCase();
var my_suff_rightV = get_right_vowel[suff][my_suff_c];
if (my_suff_rightV == "?"){
    if (lang == "F" || lang == "CF"){
        my_suff_rightV = "e";
        my_suff_wrongV = "i";   
    }
    if (lang == "B" || lang == "CB"){
        my_suff_rightV = "i";
        my_suff_wrongV = "e";   
    }
}
else {
    var my_suff_wrongV = get_wrong_vowel[suff][my_suff_c];   
}
var my_correct_word = "alien_dagak"+my_suff_rightV+my_suff_c;
var my_wrong_word = "alien_dagak"+my_suff_wrongV+my_suff_c;
        
var pq15_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/".concat(my_correct_word).concat(".wav' type='audio/wav'></audio>");
var pq15_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/".concat(my_wrong_word).concat(".wav' type='audio/wav'></audio>");                   
       
var pq15_choices_html = silence_one.concat(silence_two).concat(pq15_a).concat(pq15_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the correct description of the picture above?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
var pq15_stem_html = stem_silence.concat("<table align='center'><tr><td><img src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.png'></td></tr></table><p align='center'>The word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls id='stem_player' align='center'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/dagak.wav' type='audio/wav'></audio></td></tr></table>").concat(player_function_stem);
         
items.push(["pq_stem_15", "my_Separator", {normalMessage:pq15_stem_html, errorMessage:"", transfer:2500}]);
items.push(["pq_choice_15", "ComicCaption", {s:"", q:pq15_choices_html, html:"http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.png", mean:"T", hasCorrect:"A", as:["A", "B"]}]);     

//Q16: Alien Leaf(fagak)+Right
var my_suff_c = meaning_to_suffix["R"].toLowerCase();
var my_suff_rightV = get_right_vowel[suff][my_suff_c];
if (my_suff_rightV == "?"){
    if (lang == "F" || lang == "CF"){
        my_suff_rightV = "e";
        my_suff_wrongV = "i";   
    }
    if (lang == "B" || lang == "CB"){
        my_suff_rightV = "i";
        my_suff_wrongV = "e";   
    }
}
else {
    var my_suff_wrongV = get_wrong_vowel[suff][my_suff_c];   
}
var my_correct_word = "alien_fagak"+my_suff_rightV+my_suff_c;
var my_wrong_word = "alien_fagak"+my_suff_wrongV+my_suff_c;

var pq16_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/".concat(my_correct_word).concat(".wav' type='audio/wav'></audio>");
var pq16_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/".concat(my_wrong_word).concat(".wav' type='audio/wav'></audio>");                  
        
var pq16_choices_html = silence_one.concat(silence_two).concat(pq16_a).concat(pq16_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the correct description of the picture above?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
var pq16_stem_html = stem_silence.concat("<table align='center'><tr><td><img src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/leaf.png'></td></tr></table><p align='center'>The word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls id='stem_player' align='center'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/fagak.wav' type='audio/wav'></audio></td></tr></table>").concat(player_function_stem);
        
items.push(["pq_stem_16", "my_Separator", {normalMessage:pq16_stem_html, errorMessage:"", transfer:2500}]);
items.push(["pq_choice_16", "ComicCaption", {s:"", q:pq16_choices_html, html:"http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/leaf.png", mean:"R", hasCorrect:"A", as:["A", "B"]}]);

//Q17: Alien Leaf(fagak)+Left
var my_suff_c = meaning_to_suffix["L"].toLowerCase();
var my_suff_rightV = get_right_vowel[suff][my_suff_c];
if (my_suff_rightV == "?"){
    if (lang == "F" || lang == "CF"){
        my_suff_rightV = "e";
        my_suff_wrongV = "i";   
    }
    if (lang == "B" || lang == "CB"){
        my_suff_rightV = "i";
        my_suff_wrongV = "e";   
    }
}
else {
    var my_suff_wrongV = get_wrong_vowel[suff][my_suff_c];   
}
var my_correct_word = "alien_fagak"+my_suff_rightV+my_suff_c;
var my_wrong_word = "alien_fagak"+my_suff_wrongV+my_suff_c;
        
var pq17_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/".concat(my_correct_word).concat(".wav' type='audio/wav'></audio>");
var pq17_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/".concat(my_wrong_word).concat(".wav' type='audio/wav'></audio>");                   
     
var pq17_choices_html = silence_one.concat(silence_two).concat(pq17_a).concat(pq17_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the correct description of the picture above?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
var pq17_stem_html = stem_silence.concat("<table align='center'><tr><td><img src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/leaf.png'></td></tr></table><p align='center'>The word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls id='stem_player' align='center'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/fagak.wav' type='audio/wav'></audio></td></tr></table>").concat(player_function_stem);
          
items.push(["pq_stem_17", "my_Separator", {normalMessage:pq17_stem_html, errorMessage:"", transfer:2500}]);
items.push(["pq_choice_17", "ComicCaption", {s:"", q:pq17_choices_html, html:"http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/leaf.png", mean:"L", hasCorrect:"A", as:["A", "B"]}]);
   
//Q18: Alien Leaf(fagak)+In Front
var my_suff_c = meaning_to_suffix["F"].toLowerCase();
var my_suff_rightV = get_right_vowel[suff][my_suff_c];
if (my_suff_rightV == "?"){
    if (lang == "F" || lang == "CF"){
        my_suff_rightV = "e";
        my_suff_wrongV = "i";   
    }
    if (lang == "B" || lang == "CB"){
        my_suff_rightV = "i";
        my_suff_wrongV = "e";   
    }
}
else {
    var my_suff_wrongV = get_wrong_vowel[suff][my_suff_c];   
}
var my_correct_word = "alien_fagak"+my_suff_rightV+my_suff_c;
var my_wrong_word = "alien_fagak"+my_suff_wrongV+my_suff_c;
        
var pq18_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/".concat(my_wrong_word).concat(".wav' type='audio/wav'></audio>");
var pq18_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/".concat(my_correct_word).concat(".wav' type='audio/wav'></audio>");                   
        
var pq18_choices_html = silence_one.concat(silence_two).concat(pq18_a).concat(pq18_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the correct description of the picture above?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
var pq18_stem_html = stem_silence.concat("<table align='center'><tr><td><img src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/leaf.png'></td></tr></table><p align='center'>The word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls id='stem_player' align='center'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/fagak.wav' type='audio/wav'></audio></td></tr></table>").concat(player_function_stem);
         
items.push(["pq_stem_18", "my_Separator", {normalMessage:pq18_stem_html, errorMessage:"", transfer:2500}]);
items.push(["pq_choice_18", "ComicCaption", {s:"", q:pq18_choices_html, html:"http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/leaf.png", mean:"F", hasCorrect:"B", as:["A", "B"]}]);
  
//Q19: Alien Leaf(fagak)+Below
var my_suff_c = meaning_to_suffix["B"].toLowerCase();
var my_suff_rightV = get_right_vowel[suff][my_suff_c];
if (my_suff_rightV == "?"){
    if (lang == "F" || lang == "CF"){
        my_suff_rightV = "e";
        my_suff_wrongV = "i";   
    }
    if (lang == "B" || lang == "CB"){
        my_suff_rightV = "i";
        my_suff_wrongV = "e";   
    }
}
else {
    var my_suff_wrongV = get_wrong_vowel[suff][my_suff_c];   
}
var my_correct_word = "alien_fagak"+my_suff_rightV+my_suff_c;
var my_wrong_word = "alien_fagak"+my_suff_wrongV+my_suff_c;
        
var pq19_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/".concat(my_wrong_word).concat(".wav' type='audio/wav'></audio>");
var pq19_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/".concat(my_correct_word).concat(".wav' type='audio/wav'></audio>");                  
       
var pq19_choices_html = silence_one.concat(silence_two).concat(pq19_a).concat(pq19_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the correct description of the picture above?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
var pq19_stem_html = stem_silence.concat("<table align='center'><tr><td><img src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/leaf.png'></td></tr></table><p align='center'>The word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls id='stem_player' align='center'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/fagak.wav' type='audio/wav'></audio></td></tr></table>").concat(player_function_stem);
          
items.push(["pq_stem_19", "my_Separator", {normalMessage:pq19_stem_html, errorMessage:"", transfer:2500}]);
items.push(["pq_choice_19", "ComicCaption", {s:"", q:pq19_choices_html, html:"http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/leaf.png", mean:"B", hasCorrect:"B", as:["A", "B"]}]);

//Q20: Alien Leaf(fagak)+Top
var my_suff_c = meaning_to_suffix["T"].toLowerCase();
var my_suff_rightV = get_right_vowel[suff][my_suff_c];
if (my_suff_rightV == "?"){
    if (lang == "F" || lang == "CF"){
        my_suff_rightV = "e";
        my_suff_wrongV = "i";   
    }
    if (lang == "B" || lang == "CB"){
        my_suff_rightV = "i";
        my_suff_wrongV = "e";   
    }
}
else {
    var my_suff_wrongV = get_wrong_vowel[suff][my_suff_c];   
}
var my_correct_word = "alien_fagak"+my_suff_rightV+my_suff_c;
var my_wrong_word = "alien_fagak"+my_suff_wrongV+my_suff_c;
        
var pq20_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/".concat(my_correct_word).concat(".wav' type='audio/wav'></audio>");
var pq20_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/".concat(my_wrong_word).concat(".wav' type='audio/wav'></audio>");                   
       
var pq20_choices_html = silence_one.concat(silence_two).concat(pq20_a).concat(pq20_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the correct description of the picture above?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
var pq20_stem_html = stem_silence.concat("<table align='center'><tr><td><img src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/leaf.png'></td></tr></table><p align='center'>The word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls id='stem_player' align='center'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/fagak.wav' type='audio/wav'></audio></td></tr></table>").concat(player_function_stem);
         
items.push(["pq_stem_20", "my_Separator", {normalMessage:pq20_stem_html, errorMessage:"", transfer:2500}]);
items.push(["pq_choice_20", "ComicCaption", {s:"", q:pq20_choices_html, html:"http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/leaf.png", mean:"T", hasCorrect:"A", as:["A", "B"]}]);     
        
//Add practice ending to the items list:        
items.push(["practice_end", "Message", 
                   {
                       html: "<h1>Learning Alien Pronunciations</h1>"
                             +"<p>Nice work! You're now ready to start learning how to pronounce words and suffixes in the alien language."
                             +" This part of the experiment will be longer than previous sections, but we've broken it up into blocks so that you can take breaks when needed."
                             +" You'll start with the Training Phase, which is made up of 5 blocks that are similar to the practice questions you've already done:</p>"
                             +"<ul><li>You'll be giving directions relative to a noun in the alien language.</li>"
                             +"<li>You'll be choosing between correct and incorrect pronunciations.</li>"
                             +"<li>And your alien friend (pictured below) will be back to give you feedback on your answers.</li></ul>"
                             +"<p>After the first two blocks of thbis training, you'll get to practice more with the meanings of the suffixes."
                             +" And after the Training Phase, there'll be a Testing Phase that only includes 4 blocks and gives no feedback.</p>"
                             +"<p>Remember to listen carefully to how the words and suffixes are pronounced, and"
                             +" don't worry about memorizing the individual nouns. Good luck!</p>"
                             +"<img src='https://people.umass.edu/bprickett/Opacity_Denial/alien_face_happy.png'>"
                   }
            ]);
        
//Training items...
items = items.concat(train_bareStems);
items = items.concat(train_choices);
items = items.concat(intro_pages);
items = items.concat(break_pages);

//Test items...
items = items.concat(test_bareStems);
items = items.concat(test_choices);

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
                                  '<input type="radio" name="gender" value="O"> Other<br><br><br>'+
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
                       html: "<h1>Training Phase Complete</h1>"+
                             "<p>Now you will begin the Test Phase. The trials will be similar to the ones in training, however you will no longer receive any feedback and the words will no longer be grouped together by which suffix was added to them.</p>"+
                             "<p>Additionally, you may sometimes need to choose between two answers that both seem incorrect. Do your best to choose the word that seems the <i>most right</i> in these situations.</p>"
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
                    "preload_img", "preload_audio", "intro", "headphone_check",  "Instr0", "compQ1", "comp_feedback",
                    "Instr1", "compQ2", "comp_feedback", "Instr2", "SuffixURIntro",//Bracket here
                    "suffUR_stem_1", "suffUR_choice_1","human_feedback",
                    "suffUR_stem_2", "suffUR_choice_2","human_feedback",
                    "suffUR_stem_3", "suffUR_choice_3","human_feedback",
                    "suffUR_stem_4", "suffUR_choice_4","human_feedback",
                    "suffUR_stem_5", "suffUR_choice_5","human_feedback",
                    "Instr3", "compQ3", "comp_feedback", "Instr4"
                    
                  ]; 

 all_trials = all_trials.concat(UR_names.slice(0,120)); //Comment here
    
 all_trials = all_trials.concat([   //"not_" here
                    "Instr5", "compQ4", "comp_feedback", "Instr6", "compQ5", "comp_feedback", 
                    "practice_intro",
                    "pq_stem_1", "pq_choice_1", "human_feedback", "pq_stem_2", "pq_choice_2", "human_feedback",
                    "pq_stem_3", "pq_choice_3", "human_feedback", "pq_stem_4", "pq_choice_4", "human_feedback",
                    "pq_stem_5", "pq_choice_5", "human_feedback", 
                    //LEAF "pq_stem_6", "pq_choice_6", "human_feedback", "pq_stem_7", "pq_choice_7", "human_feedback",
                    //LEAF "pq_stem_8", "pq_choice_8", "human_feedback", "pq_stem_9", "pq_choice_9", "human_feedback",
                    //LEAF "pq_stem_10", "pq_choice_10", "human_feedback", 
                    //"practice_mid",
                    //"pq_stem_11", "pq_choice_11", "feedback", "pq_stem_12", "pq_choice_12", "feedback",
                    //"pq_stem_13", "pq_choice_13", "feedback", "pq_stem_14", "pq_choice_14", "feedback",
                    //"pq_stem_15", "pq_choice_15", "feedback", 
                    //LEAF "pq_stem_16", "pq_choice_16", "feedback", "pq_stem_17", "pq_choice_17", "feedback",
                    //LEAF "pq_stem_18", "pq_choice_18", "feedback", "pq_stem_19", "pq_choice_19", "feedback",
                    //LEAF "pq_stem_20", "pq_choice_20", "feedback", 
                    "practice_end"
                 ]);
if (test_run){
    all_trials = all_trials.concat(train_names.slice(0,6));
    all_trials = all_trials.concat(["phaseSeperator"]);
    all_trials = all_trials.concat(test_names.slice(0,6));    
}
else {
    all_trials = all_trials.concat(train_names.slice(0,train_middle));
    all_trials.push("Instr_2ndURPhase");
    all_trials = all_trials.concat(UR_names.slice(120,240));
    all_trials.push("End_2ndURPhase");
    all_trials = all_trials.concat(train_names.slice(train_middle,train_names.length));
    all_trials = all_trials.concat(["phaseSeperator"]);
    all_trials = all_trials.concat(test_names);
}
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

