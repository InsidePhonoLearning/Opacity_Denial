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
var train_block_num = 7; //Should be 7 in real exp.
var test_block_num = 4; //Should be 4 in real exp.
var test_run = false; //Should be false in real exp.
    
//Functions
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
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
    //IMAGES_TO_PRELOAD.push("https://people.umass.edu/bprickett/Opacity_Denial/Suffix_UR_Phase/".concat(p_name));
}


//Builds a UR-learning phase (i.e. exposure to clitics in isolation):
function get_URLearning(time, suff_list) {
    var ur_names = [];
    var ur_trials = [];
    //var reps = 2;
    
    if (suff == "1"){
        suff2vowel = {"ft":"e", "v":"i", "b":"o", "Z":"u"};
        withheld_ending = "sk";
    }
    else {
        suff2vowel = {"b":"e", "Z":"i", "ft":"o", "sk":"u", };
        withheld_ending = "v";
    }

    //Create an intro page...
    if (time == 0){
        var reps = 5;
        var num_trials = reps * 5;
        ur_trials.push([
                     "URIntro_0",
                     "Message",
                     {html:
                         "<h1>Giving Directions in the Alien Language</h1>"
                         +"<p>Now that you've gotten familiar how that works, you're ready to start learning the alien language. At first you'll have to guess, but you'll eventually get the hang of things using trial and error.</p>"
                         +"<p>Instead of a human helping you, this time you'll have an alien friend (pictured below) who can tell you whether you're right or wrong after you make each choice.</p>"
                         +"<img src='https://people.umass.edu/bprickett/Opacity_Denial/alien_face_happy.png'>"
                     }
            ]);
        ur_names.push("URIntro_0");
    }
    else {
           var reps = 2;
           var num_trials = reps * 5;
           ur_trials.push([
                      "URIntro_"+time,
                      "Message",
                      {html:
                                 "<h1>Suffix Meaning Review</h1>"
                                 +"<p>Nice job! It's been a while since you practiced the meanings of the alien suffixes. During the next "+num_trials+" trials, you'll get to practice your knowledge of the meanings, which will hopefully refresh your memory of them.</p>"
                                 +"<p>You'll still have your alien friend (pictured below) telling you whether you're right or wrong after you make each choice.</p>"
                                 +"<img src='https://people.umass.edu/bprickett/Opacity_Denial/alien_face_happy.png'>"
                      }
        ]);
        ur_names.push("URIntro_"+time);
  
    }
    
    //Create trials (loop through the full list twice...
    var ur_dir = "https://people.umass.edu/bprickett/Opacity_Denial/Suffix_URs/";
    var answer_options = [];
    var current_option = 0;
    for (rep_j = 0; rep_j < reps; rep_j ++){
        for (s_i = 0; s_i < suff_list.length; s_i ++){
            answer_options.push(current_option);
            if (current_option == 0){
                current_option = 1;
            }
            else {
                current_option = 0
            }
        }    
    }
    shuffle(answer_options);
    shuffle(answer_options);
    shuffle(answer_options);
    shuffle(answer_options);
    shuffle(answer_options);
    shuffle(answer_options);            
    for (rep_j = 0; rep_j < reps; rep_j ++){
        shuffle(suff_list);
        for (s_i = 0; s_i < suff_list.length; s_i ++){
           var current_suff = suff_list[s_i];
           if (current_suff == withheld_ending){
               if (lang == "B" || lang == "CB"){
                  var correct_filename = ur_dir.concat(suff).concat("_").concat("i").concat(current_suff).concat("_withheld.wav");
                  var wrong_filename = ur_dir.concat(suff).concat("_").concat("u").concat(current_suff).concat("_withheld.wav");
               }
               else {
                  var correct_filename = ur_dir.concat(suff).concat("_").concat("u").concat(current_suff).concat("_withheld.wav");
                  var wrong_filename = ur_dir.concat(suff).concat("_").concat("i").concat(current_suff).concat("_withheld.wav");
               }
           }
           else {
                  var correct_filename = ur_dir.concat(suff).concat("_").concat(suff2vowel[current_suff]).concat(current_suff).concat("_right.wav");
                  var wrong_filename = ur_dir.concat(suff).concat("_").concat(suff2vowel[current_suff]).concat(current_suff).concat("_wrong.wav");
            }
    
           var word_options = ["A", "B"];
           var this_option = answer_options.pop();
           var correct_word =  word_options[this_option];
    
           if (correct_word == "A"){
               var urHTML_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='".concat(correct_filename).concat("' type='audio/wav'></audio>");
               var urHTML_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='".concat(wrong_filename).concat("' type='audio/wav'></audio>");
           }
           else {
               var urHTML_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='".concat(wrong_filename).concat("' type='audio/wav'></audio>");
               var urHTML_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='".concat(correct_filename).concat("' type='audio/wav'></audio>");
           }
   
           var ur_choices_html = silence_one.concat(silence_two).concat(urHTML_a).concat(urHTML_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the correct description of the picture above?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
     
           ur_trials.push(["URtrial_"+time+"."+s_i+"."+rep_j, "ComicCaption", {s:"", q:ur_choices_html, html:"http://people.umass.edu/bprickett/Opacity_Denial/outlined_square.jpg", mean:suffix_to_meaning[current_suff], hasCorrect:correct_word, as:["A", "B"]}]);
           ur_names.push("URtrial_"+time+"."+s_i+"."+rep_j);
           ur_names.push("feedback");
       }
    }
   
    //Create outro page...
    if (time==0){
        ur_trials.push([
            "UROutro_0",
            "Message",
            {html:
             "<h1>Giving Directions with Suffixes</h1>"
             +"<p>Great work! But there's more to learn about the alien language than just the meaning of those 5 words:</p>"
             +"<ul><li>When you're giving directions relative to a noun, the direction word will take the form of a suffix at the end of the noun.</li>"
             +"<li>A <i>suffix</i> is material that's added to the end of a word to change its meaning.</li><li>For example, in English, we usually"
             +" make nouns plural by adding '-s' to them: 'cat' &rarr; 'cat<b><u>s</u></b>'</li></ul>"
            }
        ]);  

    }
    else {
               ur_trials.push([
               "UROutro_"+time,
               "Message",
               {html:
               "<h1>Suffix Practice Complete</h1>"
               +"<p>Great work! Now that you've practiced the suffix meanings some more, it's time to continue.</p>"}
               ]);
              ur_names.push("UROutro_"+time);
      }

    return [ur_names, ur_trials];
}

//**************************************
// BUILD TRAINING TRIALS
//***************************************
//Suffixes:
//1: v, ft, Z, b, sk
//2: Z, b, sk, ft, v

//General data to keep track of:    
var audio_dir = "https://people.umass.edu/bprickett/Opacity_Denial/Language=".concat(lang).concat("_Suffixes=").concat(suff).concat("/");
function get_suffDict(L) {
    var suffix_dict = { //This is a way to look up a suffix based on what condition and trial type you're in.
        "1": {
            "Train": {
                "FaithNoHarm": ["v", "ft", "Z", "b"],
                "FaithNoPal": ["Z", "b", "Z", "b"],
                "Harm": ["v", "ft", "Z", "b"],
                //"Inter": ["B", "F"],
                "Pal": ["v", "ft","v", "ft"]
            },
            "Test":  {
                "Harm_newAff": ["sk", "sk", "sk", "sk", "sk"],
                //"Inter_newAff": ["K"],
                //"Inter_newType": ["D", "P"],
            }
        },  
        
        "2": {
            "Train": {
                "FaithNoHarm": ["Z", "b", "sk", "ft"],
                "FaithNoPal": ["sk", "ft"],
                "Harm": ["Z", "b", "sk", "ft"],
                //"Inter": ["B", "F"],
                "Pal": ["Z", "b"]
            },
            "Test":  {
                "Harm_newAff": ["v"],
                //"Inter_newAff": ["K"],
                //"Inter_newType": ["D", "P"],
            }
        }  
    };

    //Since interacting differs across languages, deal with that here:
    if (L == "F" || L == "CF"){
            suffix_dict["1"]["Train"]["Inter"] = ["Z", "b", "Z", "b"];
            suffix_dict["1"]["Test"]["Inter_newAff"] = ["sk", "sk", "sk", "sk", "sk"];
            suffix_dict["1"]["Test"]["Inter_newType"] = ["v", "ft", "v", "ft","v", "ft", "v", "ft", "v", "ft"];
            suffix_dict["2"]["Train"]["Inter"] = ["sk", "ft","sk", "ft"];
            suffix_dict["2"]["Test"]["Inter_newAff"] = ["v", "v", "v", "v", "v"];
            suffix_dict["2"]["Test"]["Inter_newType"] = ["Z", "b", "Z", "b", "Z", "b", "Z", "b", "Z", "b"];       
            };
    if (L == "B" || L == "CB"){
            suffix_dict["1"]["Train"]["Inter"] = ["v", "ft", "v", "ft"];
            suffix_dict["1"]["Test"]["Inter_newAff"] = ["sk", "sk", "sk", "sk", "sk"];
            suffix_dict["1"]["Test"]["Inter_newType"] = ["Z", "b","Z", "b","Z", "b","Z", "b","Z", "b"];
            suffix_dict["2"]["Train"]["Inter"] = ["Z", "b", "Z", "b"];
            suffix_dict["2"]["Test"]["Inter_newAff"] = ["v", "v", "v", "v", "v"];
            suffix_dict["2"]["Test"]["Inter_newType"] = ["sk", "ft", "sk", "ft", "sk", "ft", "sk", "ft", "sk", "ft"];   
            };

    return suffix_dict;
}


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
    raw_suffs = ["v", "ft", "Z", "b"];
    var all_suffs = raw_suffs.concat(["sk"]);
    shuffle(raw_suffs);
    for (var i=0; i < raw_suffs.length; i++){
          suffix_to_meaning[raw_suffs[i]] = meanings[i];
          meaning_to_suffix[meanings[i]] = raw_suffs[i];
          meaning_string = meaning_string + raw_suffs[i]+"->"+meanings[i]+";";
    }
    suffix_to_meaning["sk"] = withheld_mean;
    meaning_to_suffix[withheld_mean] = "sk";
    meaning_string = meaning_string + "K->"+withheld_mean+";";
}
if (suff == "2") {
    raw_suffs = ["Z", "b", "sk", "ft"];
    var all_suffs = raw_suffs.concat(["v"]);
    shuffle(raw_suffs);
    for (var i=0; i < raw_suffs.length; i++){
          suffix_to_meaning[raw_suffs[i]] = meanings[i];
          meaning_to_suffix[meanings[i]] = raw_suffs[i];
          meaning_string = meaning_string + raw_suffs[i]+"->"+meanings[i]+";";
    }
    suffix_to_meaning["v"] = withheld_mean;   
    meaning_to_suffix[withheld_mean] = "v";
    meaning_string = meaning_string + "B->"+withheld_mean+";";  
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
 
var all_audio = "<audio style='visibility:hidden;' controls preload='auto'><source src='https://people.umass.edu/bprickett/Opacity_Denial/silence.wav'></audio>";
    
//Arrays to build:
var train_bareStems = [];
var train_choices = [];
var break_pages = [];
var train_names = [];
var i = 0;
var stem_num_tracker = {"Train":{"FaithNoHarm":{}, "FaithNoPal":{}, "Harm":{}, "Pal":{}, "Inter":{}}, "Test":{"Harm_newAff":{}, "Inter_newAff":{}, "Inter_newType":{}}};
for (phase in stem_num_tracker){
    for (tt in stem_num_tracker[phase]){
        for (var s_i = 0; s_i < all_suffs.length; s_i ++){
                s = all_suffs[s_i]
                stem_num_tracker[phase][tt][s] = 0;
            }
        }
    }

//Put everything together to create the pieces of the training phase:
for (var block_num = 0; block_num < train_block_num; block_num++){
    
    var block_template = ["FaithNoHarm", "FaithNoPal", "Harm", "Pal", "Inter","FaithNoHarm", "FaithNoPal", "Harm", "Pal", "Inter","FaithNoHarm", "FaithNoPal", "Harm", "Pal", "Inter","FaithNoHarm", "FaithNoPal", "Harm", "Pal", "Inter"]
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
        var this_suff = my_sd[suff]["Train"][this_tt].pop();
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
        
        //Make the name of the audio file:
        bareStem_file = "Train_".concat(this_tt).concat("_BareStem_").concat(stem_num).concat("_").concat(this_suff).concat(".wav");
        correct_file = "Train_".concat(this_tt).concat("_CorrectChoice_").concat(stem_num).concat("_").concat(this_suff).concat(".wav");
        incorrect_file = "Train_".concat(this_tt).concat("_IncorrectChoice_").concat(stem_num).concat("_").concat(this_suff).concat(".wav");
        
        //Randomize which side the correct word happens on:
        var word_options = ["A", "B"];
        var this_option = answer_options.pop();
        var correct_word =  word_options[this_option];
        
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
        all_audio = all_audio.concat("<audio style='visibility:hidden;' controls preload='auto'><source src='").concat(audio_dir).concat(bareStem_file).concat("' type='audio/wav'></audio>");
        all_audio = all_audio.concat("<audio style='visibility:hidden;' controls preload='auto'><source src='").concat(audio_dir).concat(correct_file).concat("' type='audio/wav'></audio>");
        all_audio = all_audio.concat("<audio style='visibility:hidden;' controls preload='auto'><source src='").concat(audio_dir).concat(incorrect_file).concat("' type='audio/wav'></audio>");
       
        //Build the two pages that have audio in them:
        var choices_html = silence_one.concat(silence_two).concat(audio_a).concat(audio_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the correct word for the above picture?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
        var picture_html = pic_dir.concat(pic_file);
        var stem_html = stem_silence.concat("<style>*.Message-continue-link {position: relative; left:200px;}</style><table align='center'><tr><td><img src='").concat(picture_html).concat("'></td></tr></table><p align='center'>The word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls id='stem_player' align='center'><source src='").concat(audio_dir).concat(bareStem_file).concat("' type='audio/wav'></audio></td></tr></table>").concat(player_function_stem);
        
        //Set up the item objects:
        train_bareStems.push(["train_stem_"+i, "Message", {html:stem_html}]);
        train_names.push("train_stem_"+i);
        train_choices.push(["train_choice_"+i, "ComicCaption", {s:"", q:choices_html, html:picture_html, mean:this_meaning, hasCorrect:correct_word, as:["A", "B"]}]);
        train_names.push("train_choice_"+i);
        train_names.push("feedback");
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
    var [ur_names, ur_items] = get_URLearning("train"+bNum, all_suffs);
    train_names = train_names.concat(ur_names);
    train_choices = train_choices.concat(ur_items);
            
}


//**************************************
// BUILD TESTING TRIALS
//***************************************
var block_template = [
                                 "Harm_newAff", "Harm_newAff","Harm_newAff","Harm_newAff","Harm_newAff",
                                 "Inter_newAff", "Inter_newAff","Inter_newAff","Inter_newAff","Inter_newAff",
                                 "Inter_newType", "Inter_newType","Inter_newType","Inter_newType","Inter_newType",
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
        
        if (this_tt == "Inter_newType"){
              bareStem_file = "Test_".concat(this_tt).concat("_BareStem_").concat(stem_num).concat("_").concat(this_suff).concat(".wav");
              correct_file = "Test_".concat(this_tt).concat("_Both-Rules-ApplyingChoice_").concat(stem_num).concat("_").concat(this_suff).concat(".wav");
              incorrect_file = "Test_".concat(this_tt).concat("_JustHarmonizingChoice_").concat(stem_num).concat("_").concat(this_suff).concat(".wav");
        }
        else{
              bareStem_file = "Test_".concat(block_template[tt]).concat("_BareStem_").concat(stem_num).concat("_").concat(this_suff).concat(".wav");
              correct_file = "Test_".concat(block_template[tt]).concat("_CorrectChoice_").concat(stem_num).concat("_").concat(this_suff).concat(".wav");
              incorrect_file = "Test_".concat(block_template[tt]).concat("_IncorrectChoice_").concat(stem_num).concat("_").concat(this_suff).concat(".wav");
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
        all_audio = all_audio.concat("<audio style='visibility:hidden;' controls preload='auto'><source src='").concat(audio_dir).concat(bareStem_file).concat("' type='audio/wav'></audio>");
        all_audio = all_audio.concat("<audio style='visibility:hidden;' controls preload='auto'><source src='").concat(audio_dir).concat(correct_file).concat("' type='audio/wav'></audio>");
        all_audio = all_audio.concat("<audio style='visibility:hidden;' controls preload='auto'><source src='").concat(audio_dir).concat(incorrect_file).concat("' type='audio/wav'></audio>");

        //Build the two pages that have audio in them:
        var choices_html = silence_one.concat(silence_two).concat(audio_a).concat(audio_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the <b>most</b> correct word for the above picture?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
        var picture_html = pic_dir.concat(pic_file);
        var stem_html = stem_silence.concat("<style>*.Message-continue-link {position: relative; left:200px;}</style><table align='center'><tr><td><img src='").concat(picture_html).concat("'></td></tr></table><p align='center'>The word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls id='stem_player' align='center'><source src='").concat(audio_dir).concat(bareStem_file).concat("' type='audio/wav'></audio></td></tr></table>").concat(player_function_stem);
           

        //Set up the item objects:
        test_bareStems.push(["test_stem_"+i, "Message", {html:stem_html}]);
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
    
    //Make a UR-training block:
    if (bNum < test_block_num){
        var [ur_names, ur_items] = get_URLearning("test"+bNum, all_suffs);
        test_names = test_names.concat(ur_names);
        test_choices = test_choices.concat(ur_items);
    }
}


//**********************
// BUILD ITEMS ARRAY
//***********************

//Pieces of the "intro" screen:
instruct = "<style>*.Message-continue-link {position: relative; left:200px;}</style><div style='padding:50px;'><h1>Welcome!</h1><p>In this experiment, you will be asked to learn aspects of an imaginary 'alien' language. The experiment should take about an hour, but before we start, there are some important pieces of information that we need to go over first:</p><ul>";
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
               ["headphone_check", "Form", {consentRequired: false, html:"<b>What kind of headphones are you using? (Please give the brand and model number if available)</b><br><br>"+'<textarea rows="3" cols="60" name="headphones" class="obligatory"></textarea><br><br>'}],
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
                          +"<p>After the instructions/practice the rest of the experiment will proceed as follows:<ul>"
                          +"<li>A training phase, divided into "+train_block_num+" blocks. After each block, there'll be a little more practice.</li>"
                          +"<li>A testing phase, divided into "+test_block_num+" blocks. After each block, there'll be practice here too (except the last one, of course).</li>"
                          +"<li>A short survey, with questions about your experience.</li>"
                    }
            ]);
    
items.push([
                   "Instr1",
                   "Message",
                   {html:  
                          "<h1>How you'll learn...</h1>"
                          +"<p>In this experiment you will learn how to give directions."
                          +" Each trial will present you with an arrow, which will be pointing either <u>above</u>, <u>below</u>, <u>in front of</u>, <u>to the right of</u>, or <u>to the left of</u> something."
                          +"<p style='font-weight:bold;'>Your job is to learn how to describe the location of the arrow in the alien language.</p>"
                    }
            ]);
 items.push(["compQ2", "Question", {q:"Where will the arrow never point to?", hasCorrect:"Behind", as:["Behind", "Above"]}]);
 
 items.push([
                   "Instr2",
                   "Message",
                   {html:
                          "<h1>How you'll learn... (Continued)</h1>"
                          +"<p>To give directions, you'll be clicking on one of two randomly ordered choices: "
                          +"one will be an audio clip that gives correct directions and one will be a clip that gives incorrect ones.</p>"
                          +"<ul><li>Click the left button (labeled ‘A’) if you think the first clip is correct</li>"
                          +"<li>Click the right button (labeled ‘B’) if you think the second clip is correct</li></ul>"
                   }
             ]);
  items.push([
                  "Instr3",
                  "Message",
                  {html:
                          "<h1>Practice in English</h1>"
                          +"<p>Before you start giving directions in the alien language, we'll give you a few trials in English to try things out."
                          +" To help you with this, we've provided you with a friend (pictured below) who can tell you whether you're right or wrong after you make each choice.</p>"
                          +"<img src='https://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/human_face_happy.png'>"
                   }
              ]);
    
 //Get a block of UR_learning
 var [ur_names, ur_items] = get_URLearning(0, all_suffs);
 items = items.concat(ur_items);  

//Save some more audio fro preloading:
all_audio = all_audio.concat("<audio style='visibility:hidden;' controls preload='auto'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/above_ball_right.wav' type='audio/wav'></audio>");
all_audio = all_audio.concat("<audio style='visibility:hidden;' controls preload='auto'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/left_ball_right.wav' type='audio/wav'></audio>");
all_audio = all_audio.concat("<audio style='visibility:hidden;' controls preload='auto'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/right_ball_right.wav' type='audio/wav'></audio>");
all_audio = all_audio.concat("<audio style='visibility:hidden;' controls preload='auto'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.wav' type='audio/wav'></audio>");
all_audio = all_audio.concat("<audio style='visibility:hidden;' controls preload='auto'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/below_ball_right.wav' type='audio/wav'></audio>");
all_audio = all_audio.concat("<audio style='visibility:hidden;' controls preload='auto'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/front_ball_right.wav' type='audio/wav'></audio>");
all_audio = all_audio.concat("<audio style='visibility:hidden;' controls preload='auto'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/above_ball_wrong.wav' type='audio/wav'></audio>");
all_audio = all_audio.concat("<audio style='visibility:hidden;' controls preload='auto'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/left_ball_wrong.wav' type='audio/wav'></audio>");
all_audio = all_audio.concat("<audio style='visibility:hidden;' controls preload='auto'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/right_ball_wrong.wav' type='audio/wav'></audio>");
all_audio = all_audio.concat("<audio style='visibility:hidden;' controls preload='auto'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/below_ball_wrong.wav' type='audio/wav'></audio>");
all_audio = all_audio.concat("<audio style='visibility:hidden;' controls preload='auto'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/front_ball_wrong.wav' type='audio/wav'></audio>");     
    
//English suffix UR Q1    
var suffUR1_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/EnglishDirectionWords/above.wav' type='audio/wav'></audio>";
var suffUR1_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/EnglishDirectionWords/left.wav' type='audio/wav'></audio>";                   
 
var suffUR1_choices_html = silence_one.concat(silence_two).concat(suffUR1_a).concat(suffUR1_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the correct description of the picture above?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
//var suffUR1_stem_html = stem_silence.concat("<table align='center'><tr><td><img src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.png'></td></tr></table><p align='center'>The word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls id='stem_player' align='center'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.wav' type='audio/wav'></audio></td></tr></table>").concat(player_function_stem);
       
//items.push(["suffUR_stem_1", "my_Separator", {normalMessage:suffUR1_stem_html, errorMessage:"", transfer:2500}]);
items.push(["suffUR_choice_1", "ComicCaption", {s:"", q:suffUR1_choices_html, html:"http://people.umass.edu/bprickett/Opacity_Denial/outlined_square.jpg", mean:"L", face:"human", hasCorrect:"B", as:["A", "B"]}]);
    
//English suffix UR Q2    
var suffUR2_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/EnglishDirectionWords/above.wav' type='audio/wav'></audio>";
var suffUR2_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/EnglishDirectionWords/below.wav' type='audio/wav'></audio>";                   
    
var suffUR2_choices_html = silence_one.concat(silence_two).concat(suffUR2_a).concat(suffUR2_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the correct description of the picture above?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
//var suffUR2_stem_html = stem_silence.concat("<table align='center'><tr><td><img src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.png'></td></tr></table><p align='center'>The word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls id='stem_player' align='center'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.wav' type='audio/wav'></audio></td></tr></table>").concat(player_function_stem);
       
//items.push(["suffUR_stem_2", "my_Separator", {normalMessage:suffUR2_stem_html, errorMessage:"", transfer:2500}]);
items.push(["suffUR_choice_2", "ComicCaption", {s:"", q:suffUR2_choices_html, html:"http://people.umass.edu/bprickett/Opacity_Denial/outlined_square.jpg", mean:"T", face:"human", hasCorrect:"A", as:["A", "B"]}]);
 
//English suffix UR Q3    
var suffUR3_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/EnglishDirectionWords/front.wav' type='audio/wav'></audio>";
var suffUR3_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/EnglishDirectionWords/right.wav' type='audio/wav'></audio>";                   

var suffUR3_choices_html = silence_one.concat(silence_two).concat(suffUR3_a).concat(suffUR3_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the correct description of the picture above?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
//var suffUR3_stem_html = stem_silence.concat("<table align='center'><tr><td><img src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.png'></td></tr></table><p align='center'>The word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls id='stem_player' align='center'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.wav' type='audio/wav'></audio></td></tr></table>").concat(player_function_stem);
       
//items.push(["suffUR_stem_3", "my_Separator", {normalMessage:suffUR3_stem_html, errorMessage:"", transfer:2500}]);
items.push(["suffUR_choice_3", "ComicCaption", {s:"", q:suffUR3_choices_html, html:"http://people.umass.edu/bprickett/Opacity_Denial/outlined_square.jpg", mean:"F", face:"human", hasCorrect:"A", as:["A", "B"]}]);
 
//English suffix UR Q14   
var suffUR4_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/EnglishDirectionWords/left.wav' type='audio/wav'></audio>";
var suffUR4_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/EnglishDirectionWords/below.wav' type='audio/wav'></audio>";                   
        
var suffUR4_choices_html = silence_one.concat(silence_two).concat(suffUR4_a).concat(suffUR4_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the correct description of the picture above?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
//var suffUR4_stem_html = stem_silence.concat("<table align='center'><tr><td><img src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.png'></td></tr></table><p align='center'>The word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls id='stem_player' align='center'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.wav' type='audio/wav'></audio></td></tr></table>").concat(player_function_stem);
       
//items.push(["suffUR_stem_4", "my_Separator", {normalMessage:suffUR4_stem_html, errorMessage:"", transfer:2500}]);
items.push(["suffUR_choice_4", "ComicCaption", {s:"", q:suffUR4_choices_html, html:"http://people.umass.edu/bprickett/Opacity_Denial/outlined_square.jpg", mean:"B", face:"human", hasCorrect:"B", as:["A", "B"]}]);
 
//English suffix UR Q5    
var suffUR5_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/EnglishDirectionWords/right.wav' type='audio/wav'></audio>";
var suffUR5_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/EnglishDirectionWords/left.wav' type='audio/wav'></audio>";                   
        
var suffUR5_choices_html = silence_one.concat(silence_two).concat(suffUR5_a).concat(suffUR5_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the correct description of the picture above?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
//var suffUR5_stem_html = stem_silence.concat("<table align='center'><tr><td><img src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.png'></td></tr></table><p align='center'>The word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls id='stem_player' align='center'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.wav' type='audio/wav'></audio></td></tr></table>").concat(player_function_stem);
       
//items.push(["suffUR_stem_5", "my_Separator", {normalMessage:suffUR5_stem_html, errorMessage:"", transfer:2500}]);
items.push(["suffUR_choice_5", "ComicCaption", {s:"", q:suffUR5_choices_html, html:"http://people.umass.edu/bprickett/Opacity_Denial/outlined_square.jpg", mean:"R", face:"human", hasCorrect:"A", as:["A", "B"]}]);

//Learning the affixes   
items.push(["compQ3", "Question", {q:"What suffix in English is usually added to plural nouns?", hasCorrect:"'-s'", as:["'-ed'", "'-s'"]}]);

    
//Linguistics lesson pages:
items.push([
                   "Instr4",
                   "Message",
                   {html:
                         "<h1>Learning Correct Suffix Pronunciations</h1>"+
                         "<p>In many languages, how a suffix is pronounced depends on the word it attaches to. "+
                         "For example, the English plural suffix, '-s', is pronounced differently in different words:</p>"+
                         "<ul><li>In 'cat<b><u>s</u></b>' the plural suffix makes a standard 's' sound.</li><li>But in 'dog<b><u>s</u></b>', it makes a 'z' sound.</li></ul>"
                         
                   }
             ]);
items.push(["compQ4", "Question", {q:"What kind of sound does the plural suffix make in 'dogs'?", hasCorrect:"A 'z' sound", as:["An 's' sound", "A 'z' sound"]}]);
   
items.push([
                   "Instr5",
                   "Message",
                   {html:
                         "<h1>Learning Correct Word Pronunciations</h1>"+
                         "<p>Words can sometimes also undergo changes in pronunciation when suffixes are attached to them. "+
                         "For example, in English, to make the plural form of 'life', an 'f' sound changes into a 'v'. Other words do this too:</p>"+
                         "<ul><li>'li<u>f</u>e' &rarr; 'li<b><u>v</b></u>es'</li><li>'hoo<u>f</u>' &rarr; 'hoo<b><u>v</b></u>es' </li><li>'lea<u>f</u>' &rarr; 'lea<u><b>v</u></b>es'</li></ul>"+
                         "<p>In this experiment, it will be important to pay attention to how both the words <i>and</i> the suffixes are prounced whenever "+
                         "you're giving directions.</p>"
                   }
             ]);
items.push(["compQ5", "Question", {q:"Which noun changes its 'f' to a 'v' when a plural suffix is added to it?", hasCorrect:"Life", as:["Life", "Cat"]}]);

        
//English Practice Questions
//Add practice intro to items list:      
items.push(["Instr6", "Message",
                   {
                       html: "<h1>Pronunciation Practice</h1><div>"
                             +"<p>Soon you'll start learning how to correctly pronounce words with suffixes in the alien language. But before you do that, "
                             +"let's start with some more practice questions in English so that you can get the hang of giving directions relative to a noun:</p>"
                             +"<ul><li>You'll now be presented with a noun in isolation and then you'll see the noun with an arrow near it.</li><li>Your job is to pick "
                             +"the audio clip that correctly describes where the arrow is pointing, relative to that noun.</li>"
                             +"<li>To help you with this, your human friend (pictured below) has returned to give you more feedback on your choices.</li></ul>"
                             +"<img src='https://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/human_face_happy.png'></div>"
                   }
            ]);
      
//Q1: English Ball+Left
var pq1_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/left_ball_wrong.wav' type='audio/wav'></audio>";
var pq1_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/left_ball_right.wav' type='audio/wav'></audio>";                   
        
var pq1_choices_html = silence_one.concat(silence_two).concat(pq1_a).concat(pq1_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the correct description of the picture above?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
var pq1_stem_html = stem_silence.concat("<style>*.Message-continue-link {position: relative; left:200px;}</style><table align='center'><tr><td><img src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.png'></td></tr></table><p align='center'>The word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls id='stem_player' align='center'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.wav' type='audio/wav'></audio></td></tr></table>").concat(player_function_stem);
        
items.push(["pq_stem_1", "Message", {html:pq1_stem_html}]);
items.push(["pq_choice_1", "ComicCaption", {s:"", q:pq1_choices_html, html:"http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.png", mean:"L", face:"human", hasCorrect:"B", as:["A", "B"]}]);

//Q2: English Ball+Right
var pq2_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/right_ball_right.wav' type='audio/wav'></audio>";        
var pq2_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/right_ball_wrong.wav' type='audio/wav'></audio>";                   
        
var pq2_choices_html = silence_one.concat(silence_two).concat(pq2_a).concat(pq2_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the correct description of the picture above?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
var pq2_stem_html = stem_silence.concat("<style>*.Message-continue-link {position: relative; left:200px;}</style><table align='center'><tr><td><img src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.png'></td></tr></table><p align='center'>The word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls id='stem_player' align='center'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.wav' type='audio/wav'></audio></td></tr></table>").concat(player_function_stem);
          
items.push(["pq_stem_2", "Message", {html:pq2_stem_html}]);
items.push(["pq_choice_2", "ComicCaption", {s:"", q:pq2_choices_html, html:"http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.png", mean:"R", face:"human", hasCorrect:"A", as:["A", "B"]}]);
   
//Q3: English Ball+Top/Above
var pq3_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/above_ball_right.wav' type='audio/wav'></audio>";        
var pq3_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/above_ball_wrong.wav' type='audio/wav'></audio>";                   
        
var pq3_choices_html = silence_one.concat(silence_two).concat(pq3_a).concat(pq3_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the correct description of the picture above?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
var pq3_stem_html = stem_silence.concat("<style>*.Message-continue-link {position: relative; left:200px;}</style><table align='center'><tr><td><img src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.png'></td></tr></table><p align='center'>The word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls id='stem_player' align='center'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.wav' type='audio/wav'></audio></td></tr></table>").concat(player_function_stem);
         
items.push(["pq_stem_3", "Message", {html:pq3_stem_html}]);
items.push(["pq_choice_3", "ComicCaption", {s:"", q:pq3_choices_html, html:"http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.png", mean:"T", face:"human", hasCorrect:"A", as:["A", "B"]}]);
  
//Q4: English Ball+Below
var pq4_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/below_ball_wrong.wav' type='audio/wav'></audio>";        
var pq4_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/below_ball_right.wav' type='audio/wav'></audio>";                   
        
var pq4_choices_html = silence_one.concat(silence_two).concat(pq4_a).concat(pq4_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the correct description of the picture above?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
var pq4_stem_html = stem_silence.concat("<style>*.Message-continue-link {position: relative; left:200px;}</style><table align='center'><tr><td><img src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.png'></td></tr></table><p align='center'>The word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls id='stem_player' align='center'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.wav' type='audio/wav'></audio></td></tr></table>").concat(player_function_stem);
          
items.push(["pq_stem_4", "Message", {html:pq4_stem_html}]);
items.push(["pq_choice_4", "ComicCaption", {s:"", q:pq4_choices_html, html:"http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.png", mean:"B", face:"human", hasCorrect:"B", as:["A", "B"]}]);

//Q5: English Ball+In Front
var pq5_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/front_ball_right.wav' type='audio/wav'></audio>";        
var pq5_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/front_ball_wrong.wav' type='audio/wav'></audio>";                   
        
var pq5_choices_html = silence_one.concat(silence_two).concat(pq5_a).concat(pq5_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the correct description of the picture above?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
var pq5_stem_html = stem_silence.concat("<style>*.Message-continue-link {position: relative; left:200px;}</style><table align='center'><tr><td><img src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.png'></td></tr></table><p align='center'>The word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls id='stem_player' align='center'><source src='http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.wav' type='audio/wav'></audio></td></tr></table>").concat(player_function_stem);
         
items.push(["pq_stem_5", "Message", {html:pq5_stem_html}]);
items.push(["pq_choice_5", "ComicCaption", {s:"", q:pq5_choices_html, html:"http://people.umass.edu/bprickett/Opacity_Denial/PracticeQuestions/ball.png", mean:"F", face:"human", hasCorrect:"A", as:["A", "B"]}]);

        
//Add practice ending to the items list:        
items.push(["practice_end", "Message",
                   {
                       html: "<h1>Learning Alien Pronunciations</h1>"
                             +"<p>Nice work! You're now ready to start learning how to pronounce words with suffixes in the alien language."
                             +" This part of the experiment will be longer than previous sections, but we've broken it up into blocks so that you can take breaks when needed."
                             +" You'll start with the Training Phase, which is made up of "+train_block_num+" blocks that are similar to the practice questions you've already done:</p>"
                             +"<ul><li>You'll be giving directions relative to a noun in the alien language.</li>"
                             +"<li>You'll be choosing between correct and incorrect pronunciations.</li>"
                             +"<li>And your alien friend (pictured below) will be back to give you feedback on your answers.</li></ul>"
                             +"<p>After each block of training, you'll get to practice more with the meanings of the suffixes."
                             +" And after the Training Phase, there'll be a Testing Phase that only includes "+test_block_num+" blocks and gives no feedback.</p>"
                             +"<p>Remember to listen carefully to how the words and suffixes are pronounced, and"
                             +" don't worry about memorizing the individual nouns. Good luck!</p>"
                             +"<img src='https://people.umass.edu/bprickett/Opacity_Denial/alien_face_happy.png'>"
                   }
            ]);
        
//Training items...
items = items.concat(train_bareStems);
items = items.concat(train_choices);
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
                             "<p>Now you will begin the Test Phase. The trials will be similar to the ones in training, however you will no longer receive any feedback when being tested on words' pronunciation.</p>"+
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
                    "preload_img","preload_audio",  
                    "intro", "headphone_check",  "Instr0", "compQ1", "comp_feedback",
                    "Instr1", "compQ2", "comp_feedback", "Instr2", "Instr3",
                    "suffUR_stem_1", "suffUR_choice_1","human_feedback",
                    "suffUR_stem_2", "suffUR_choice_2","human_feedback",
                    "suffUR_stem_3", "suffUR_choice_3","human_feedback",
                    "suffUR_stem_4", "suffUR_choice_4","human_feedback",
                    "suffUR_stem_5", "suffUR_choice_5","human_feedback"
                    
                  ];

 all_trials = all_trials.concat(ur_names);
    
 all_trials = all_trials.concat([   
                    "Instr4", "compQ4", "comp_feedback", "Instr5", "compQ5", "comp_feedback", "Instr6",
                    //"practice_intro",
                    "pq_stem_1", "pq_choice_1", "human_feedback", "pq_stem_2", "pq_choice_2", "human_feedback",
                    "pq_stem_3", "pq_choice_3", "human_feedback", "pq_stem_4", "pq_choice_4", "human_feedback",
                    "pq_stem_5", "pq_choice_5", "human_feedback",
                    "practice_end"
                 ]);
all_trials = all_trials.concat(train_names);
all_trials = all_trials.concat(["phaseSeperator"]);
all_trials = all_trials.concat(test_names);
all_trials = all_trials.concat(["survey", "sr", "end"]);
                
//For debugging:
if (test_run){
 all_trials = ["intro", "suffUR_stem_1", "suffUR_choice_1","human_feedback", "survey", "sr", "end"];
}    
       
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

