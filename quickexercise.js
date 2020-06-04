function wordSpace(name){
  let word = name;
 
  if(/\w*\s\w*/.test(word)){
   console.log("Return Two Names; First and Last Separately", word) //give space
  }else{
    console.log("Your first name alone is suspected to be given", word);
  }
  
}

//let usersName = prompt("Give Your Full Name");

wordSpace("Oluwafemi Adewunmi");