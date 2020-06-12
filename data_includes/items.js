//Software based on Carolyn Anderson's ComicCaption Ibex software.
//Preload images using Alex Drummond's Preloader controller.
//All bugs, errors, and stylistic faux pas can be attributed to Brandon Prickett.

//**************************************
// INITIALIZE VARIABLES AND FUNCTIONS
//***************************************

//Conditions:
var head = "I";
var lang = "F";
var suff = "1";
var subj = "1";

var test_run = false;
    
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

//**************************************
// BUILD TRAINING TRIALS
//***************************************

//General data to keep track of:    
var audio_dir = "https://people.umass.edu/bprickett/Opacity_Denial/Stem Heads=".concat(head).concat("_Language=").concat(lang).concat("_Suffixes=").concat(suff).concat("_Subj").concat(subj).concat("/");
var c2tt2suffs = {
    
                     "1": {
                               "Train": {
                                              "FaithNoHarm": ["B", "F"],
                                              "FaithNoPal": ["B", "F"],
                                              "Harm": ["D", "P", "B", "F"],
                                              "Inter": ["B", "F"],
                                              "Pal": ["D", "P"]
                                         },
                               "Test":  {
                                              "FaithNoHarm": ["B", "F"],
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
                                              "FaithNoHarm": ["D", "P"],
                                              "FaithNoPal": ["D", "P"],
                                              "Harm": ["F", "K", "D", "P"],
                                              "Inter": ["D", "P"],
                                              "Pal": ["F", "K"]
                                         },
                               "Test":  {
                                              "FaithNoHarm": ["D", "P"],
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

var trialInfo2Stem = {
                          "Train": {
                                      "FaithNoHarm": get_numbers(20, c2tt2suffs[suff]["Train"]["FaithNoHarm"]),
                                      "FaithNoPal": get_numbers(20, c2tt2suffs[suff]["Train"]["FaithNoPal"]),
                                      "Harm": get_numbers(20, c2tt2suffs[suff]["Train"]["Harm"]),
                                      "Inter": get_numbers(20, c2tt2suffs[suff]["Train"]["Inter"]),
                                      "Pal": get_numbers(20, c2tt2suffs[suff]["Train"]["Pal"])
                                    },
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

var block_template = ["FaithNoHarm", "FaithNoHarm", "FaithNoHarm", "FaithNoHarm", 
                      "FaithNoPal", "FaithNoPal","FaithNoPal","FaithNoPal",
                      "Harm","Harm","Harm","Harm",
                      "Inter", "Inter", "Inter", "Inter",
                      "Pal", "Pal", "Pal", "Pal"];

//Create suffix->meaning mapping for this participant:
var suffix_to_meaning = {};
var meanings = ["T", "B", "F"];
var other_means = ["L", "R"];
shuffle(other_means);
var withheld_mean = other_means[0];
meanings.push(other_means[1]);
shuffle(meanings);
if (suff == "1"){
    raw_suffs = ["B", "D", "F", "P"];
    shuffle(raw_suffs);
    for (var i=0; i < raw_suffs.length; i++){
          suffix_to_meaning[raw_suffs[i]] = meanings[i];
    }
    suffix_to_meaning["K"] = withheld_mean;
}
if (suff == "2") {
    raw_suffs = ["D", "F", "P", "K"];
    shuffle(raw_suffs);
    for (var i=0; i < raw_suffs.length; i++){
          suffix_to_meaning[raw_suffs[i]] = meanings[i];
    }
    suffix_to_meaning["B"] = withheld_mean;    
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
  
//Arrays to build:
var train_bareStems = [];
var train_choices = [];
var train_names = [];
var i = 0;

//Put everything together to create the pieces of the training phase:
for (var block_num = 0; block_num < 5; block_num++){
    shuffle(block_template);
    for (var tt = 0; tt < block_template.length; tt++){
        //Find the stem and corresponding picture for this trial:
        pic_file = pic_names.pop();
        stem_num = trialInfo2Stem["Train"][block_template[tt]].pop()+"";
        
        //var bare_num = stem_num.replace(/(D|F|B|P|K)_/i, "0_");
        bareStem_file = "Train_".concat(block_template[tt]).concat("_BareStem_").concat(stem_num).concat(".wav");
        correct_file = "Train_".concat(block_template[tt]).concat("_CorrectChoice_").concat(stem_num).concat(".wav");
        incorrect_file = "Train_".concat(block_template[tt]).concat("_IncorrectChoice_").concat(stem_num).concat(".wav");
        
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
        
        //Build the two pages that have audio in them:
        var choices_html = silence_one.concat(silence_two).concat(audio_a).concat(audio_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the correct word for that picture?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
        var picture_html = pic_dir.concat(pic_file);
        var stem_html = stem_silence.concat("<table align='center'><tr><td><img src='").concat(picture_html).concat("'></td></tr></table><p align='center'>The word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls id='stem_player' align='center'><source src='").concat(audio_dir).concat(bareStem_file).concat("' type='audio/wav'></audio></td></tr></table>").concat(player_function_stem);
    
        //Figure out meaning (for arrow placement):
        var this_suff = stem_num.charAt(stem_num.search(/(P|D|K|B|F)_/i));
        var this_meaning = suffix_to_meaning[this_suff];
        
        //Set up the item objects:
        train_bareStems.push(["train_stem_"+i, "my_Separator", {normalMessage:stem_html, errorMessage:"", transfer:2500}]);
        train_names.push("train_stem_"+i);
        train_choices.push(["train_choice_"+i, "ComicCaption", {s:"", q:choices_html, html:picture_html, mean:this_meaning, hasCorrect:correct_word, as:["A", "B"]}]);
        train_names.push("train_choice_"+i);
        train_names.push("feedback");
        //train_names.push("sep");
        i ++;
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
for (var block_num = 0; block_num < 4; block_num++){
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
        
        //Build the two pages that have audio in them:
        var choices_html = silence_one.concat(silence_two).concat(audio_a).concat(audio_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the <b>most</b> correct word for that picture?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
        var picture_html = pic_dir.concat(pic_file);
        var stem_html = stem_silence.concat("<table align='center'><tr><td><img src='").concat(picture_html).concat("'></td></tr></table><p align='center'>The word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls id='stem_player' align='center'><source src='").concat(audio_dir).concat(bareStem_file).concat("' type='audio/wav'></audio></td></tr></table>").concat(player_function_stem);
    
        //Figure out meaning (for arrow placement):
        var this_suff = stem_num.charAt(stem_num.search(/(P|D|K|B|F)_/i));
        var this_meaning = suffix_to_meaning[this_suff];
        
        //Set up the item objects:
        test_bareStems.push(["test_stem_"+i, "my_Separator", {normalMessage:stem_html, errorMessage:"", transfer:2500}]);
        test_names.push("test_stem_"+i);
        test_choices.push(["test_choice_"+i, "ComicCaption", {s:"", q:choices_html, html:picture_html, mean:this_meaning, hasCorrect:correct_word, as:["A", "B"]}]);
        test_names.push("test_choice_"+i);
        //test_names.push("sep");
        i ++;
    }      
}


//**********************
// BUILD ITEMS ARRAY
//***********************

//Pieces of the "intro" screen:
instruct = "<div style='padding:50px;'><h1>Instructions:</h1><p>In this experiment, you will be asked to learn aspects of an imaginary 'alien' language. The experiment should take about 30 minutes.<p><ul><li>First, you'll answer five questions about English to practice using the experiment software. Once you've answered those, you'll move onto the Training Phase.</li><li>In the Training Phase you'll be asked questions about the alien language, and you'll receive feedback on your answers. It's okay to guess at first, since you'll be learning by trial and error. When you've finished this section, feel free to take a break.</li><li>Languages often add suffixes to words (for example, adding 's' to 'cat' in order to make the plural form, 'cats'). Throughout the experiment, you'll learn related words. Be sure to pay attention to how they sound when a suffix is added.</li><li>The last section will be the Testing Phase. It will be similar to the Training Phase, but you will no longer receive feedback on your answers.</li></ul>";
headphones = "<p>Please be sure to wear headphones while participating and do not take notes of any kind during the Training Section.";
contact = "Feel free to contact the researcher at bprickett@umass.edu if you have any questions regarding the experiment.</p>";
browser = "<p>Note: This experiment will not work properly with Internet Explorer or Safari. <span style='font-weight: bold;color:red;'>If you are using these browsers, you will not be compensated.</span> Please use another browser, such as: Google Chrome, Microsoft Edge, Firefox, or Opera.</p>";
consent = "<input type='checkbox' id='consent' name='consent' class='obligatory'>I have read the <a href='http://people.umass.edu/bprickett/ConsentForm_OpDen.pdf' target='_blank'>consent form</a> and agree to participate in this experiment.</div>";
      
//Start material:
var items = [
               ["preload", "Preloader", {images: IMAGES_TO_PRELOAD}], 
               [
                   "intro", 
                   "Form", 
                   {
                       html: instruct.concat(headphones).concat(contact).concat(browser).concat(consent),
                       consentRequired: true,
                       transfer: "click"
                   }
               ],
               ["headphone_check", "Form", {consentRequired: false, html:"<b>What kind of headphones are you using? (Please be as descriptive as possible)</b><br><br>"+'<textarea rows="3" cols="60" name="headphones" class="obligatory"></textarea><br><br>'}],
               ["sep", "Separator", {normalMessage:"Press any key to continue.", errorMessage:"Press any key to continue.", transfer:"keypress", ignoreFailure: true}],
               ["feedback", "my_Separator", {normalMessage:"<img src='https://people.umass.edu/bprickett/Phono_IE_Stimuli/Check_Pic.png'>", errorMessage:"<img src='https://people.umass.edu/bprickett/Phono_IE_Stimuli/X_pic.png'>", transfer:1000, ignoreFailure: false}]
             ];

//Practice Questions
        
//Q1: ball[s] vs. ball[z]
var pq1_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball[s].wav' type='audio/wav'></audio>";
var pq1_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball[z].wav' type='audio/wav'></audio>";                   
        
var pq1_choices_html = silence_one.concat(silence_two).concat(pq1_a).concat(pq1_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the correct word for that picture?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
var pq1_stem_html = stem_silence.concat("<table align='center'><tr><td><img src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.png'></td></tr></table><p align='center'>The word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls id='stem_player' align='center'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.wav' type='audio/wav'></audio></td></tr></table>").concat(player_function_stem);
        
items.push(["pq_stem_1", "my_Separator", {normalMessage:pq1_stem_html, errorMessage:"", transfer:2500}]);
items.push(["pq_choice_1", "ComicCaption", {s:"", q:pq1_choices_html, html:"http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.png", mean:"Practice", hasCorrect:"B", as:["A", "B"]}]);

//Q2: kisses vs. kishes
var pq2_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/kisses.wav' type='audio/wav'></audio>";        
var pq2_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/kishes.wav' type='audio/wav'></audio>";                   
        
var pq2_choices_html = silence_one.concat(silence_two).concat(pq2_a).concat(pq2_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the correct word for that picture?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
var pq2_stem_html = stem_silence.concat("<table align='center'><tr><td><img src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/kiss.png'></td></tr></table><p align='center'>The word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls id='stem_player' align='center'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/kiss.wav' type='audio/wav'></audio></td></tr></table>").concat(player_function_stem);
          
items.push(["pq_stem_2", "my_Separator", {normalMessage:pq2_stem_html, errorMessage:"", transfer:2500}]);
items.push(["pq_choice_2", "ComicCaption", {s:"", q:pq2_choices_html, html:"http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/kiss.png", mean:"Practice", hasCorrect:"A", as:["A", "B"]}]);
   
//Q3: lea[vz] vs. lea[fs]
var pq3_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/lea[vz].wav' type='audio/wav'></audio>";        
var pq3_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/lea[fs].wav' type='audio/wav'></audio>";                   
        
var pq3_choices_html = silence_one.concat(silence_two).concat(pq3_a).concat(pq3_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the correct word for that picture?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
var pq3_stem_html = stem_silence.concat("<table align='center'><tr><td><img src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/leaf.png'></td></tr></table><p align='center'>The word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls id='stem_player' align='center'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/leaf.wav' type='audio/wav'></audio></td></tr></table>").concat(player_function_stem);
         
items.push(["pq_stem_3", "my_Separator", {normalMessage:pq3_stem_html, errorMessage:"", transfer:2500}]);
items.push(["pq_choice_3", "ComicCaption", {s:"", q:pq3_choices_html, html:"http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/leaf.png", mean:"Practice", hasCorrect:"A", as:["A", "B"]}]);
  
//Q4: kesses vs. kisses
var pq4_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/kesses.wav' type='audio/wav'></audio>";        
var pq4_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/kisses.wav' type='audio/wav'></audio>";                   
        
var pq4_choices_html = silence_one.concat(silence_two).concat(pq4_a).concat(pq4_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the correct word for that picture?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
var pq4_stem_html = stem_silence.concat("<table align='center'><tr><td><img src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/kiss.png'></td></tr></table><p align='center'>The word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls id='stem_player' align='center'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/kiss.wav' type='audio/wav'></audio></td></tr></table>").concat(player_function_stem);
          
items.push(["pq_stem_4", "my_Separator", {normalMessage:pq4_stem_html, errorMessage:"", transfer:2500}]);
items.push(["pq_choice_4", "ComicCaption", {s:"", q:pq4_choices_html, html:"http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/kiss.png", mean:"Practice", hasCorrect:"B", as:["A", "B"]}]);

//Q5: roo[vz] vs. roo[fs]
var pq5_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/roo[vz].wav' type='audio/wav'></audio>";        
var pq5_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/roo[fs].wav' type='audio/wav'></audio>";                   
        
var pq5_choices_html = silence_one.concat(silence_two).concat(pq5_a).concat(pq5_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the correct word for that picture?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
var pq5_stem_html = stem_silence.concat("<table align='center'><tr><td><img src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/roof.png'></td></tr></table><p align='center'>The word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls id='stem_player' align='center'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/roof.wav' type='audio/wav'></audio></td></tr></table>").concat(player_function_stem);
         
items.push(["pq_stem_5", "my_Separator", {normalMessage:pq5_stem_html, errorMessage:"", transfer:2500}]);
items.push(["pq_choice_5", "ComicCaption", {s:"", q:pq5_choices_html, html:"http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/roof.png", mean:"Practice", hasCorrect:"A", as:["A", "B"]}]);

items.push(["practice_end", "Message", 
                   {
                       html: [
                               "div",
                               ["p", "You have now finished the practice questions. You will now begin the Training Phase in which you will be taught an alien language."],
                               ["p", "Remember, it's okay to guess at first, since you'll be learning by trial and error."]
                             ]
                   }
            ]);
        
//Training items...
items = items.concat(train_bareStems);
items = items.concat(train_choices);

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
                       html:"<h2>Please answer the following questions about yourself.</h2><p><i>None of your answers here will impact your compensation and you can skip anything you feel uncomfortable providing us with.</i></p>"+
                              "<div>"+
                                "<b>A) What is your date of birth? (Please answer with a four-digit year, like '1992')</b><br><br>"+
                                  '<textarea rows="1" cols="4" name="age"></textarea><br><br>'+
                                "<b>B) What is your gender?</b><br>"+
                                  '<input type="radio" name="train_approach" value="W"> Woman<br>'+
                                  '<input type="radio" name="train_approach" value="M"> Man<br>'+
                                  '<input type="radio" name="train_approach" value="N"> Non-Binary<br>'+
                                  '<input type="radio" name="train_approach" value="O"> Other<br><br><br>'+
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
                                  '<textarea rows="4" cols="50" name=name="test_description"></textarea><br><br>'+
                                "<br><b>5) What percent of test trials do you think you got right?</b><br><br>"+
                                  '<textarea rows="1" cols="3" name="test_description"></textarea><br><br>'+
                                "<br><b>6) Did you have an “Aha!” moment, where you suddenly realized what the pattern was?</b><br>"+
                                  '<input type="radio" name="aha_yesNo" value="1"> Yes<br>'+
                                  '<input type="radio" name="aha_yesNo" value="0"> No<br>'+
                                "<br><b>7) If so, please describe the “aha!” moment. When did it happen? What exactly did you suddenly realize?</b><br><br>"+
                                  '<textarea rows="4" cols="50" name="aha_description"></textarea><br><br>'+
                              "</div>"+
                              "<h2>Now please enter your Prolific ID:</h2>"+
                              "<div><textarea rows='1' cols='50' name='prolific_id' class='obligatory'></textarea><br><br></div>"
                   }
               ],
               [
                   "phaseSeperator", 
                   "Message", 
                   {
                       html: [
                               "div",
                               ["p", "Now you will begin the test phase. The trials will be similar to the ones in training, however you will no longer receive any feedback."],
                               ["p", "Additionally, you may sometimes need to choose between two answers that both seem incorrect. Do your best to choose the word that seems the most right in these situations."]
                             ]
                   }
               ],
               ["sr", "__SendResults__", { }],
               [
                   "end", 
                   "Message", 
                   {
                       transfer: "keypress",
                       html: "<div><p>All done! To receive compensation, click NEED A LINK.</p></div>"
                   }
               ]
          ]);

//Define sequence of experiment; preload must be first
var all_trials = [
                    "preload", "intro", "headphone_check",
                    "pq_stem_1", "pq_choice_1", "feedback", "pq_stem_2", "pq_choice_2", "feedback",
                    "pq_stem_3", "pq_choice_3", "feedback", "pq_stem_4", "pq_choice_4", "feedback",
                    "pq_stem_5", "pq_choice_5", "feedback", "practice_end"
                 ];
if (test_run){
    all_trials = all_trials.concat(train_names.slice(0,6));
    all_trials = all_trials.concat(["phaseSeperator"]);
    all_trials = all_trials.concat(test_names.slice(0,6));    
}
else {
    all_trials = all_trials.concat(train_names);
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

