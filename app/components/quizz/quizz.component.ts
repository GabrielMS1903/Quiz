import { Component, OnInit } from '@angular/core';

import quiz_questions from "../../../assets/data/quiz_questions.json" ;
//The quiz_questions is an json and it is connected in the memory like as an data


@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent implements OnInit{

title: string = ""

//Questions
questions: any  //This questions is grabing the questions in the json
questionSelected: any

//Answers
answers:string[] = []
anwersSelected: string = ""

questionIndex: number = 0 //Actual pointer
questionMaxIndex: number = 0 //The max pointer

finished:boolean = false //If the user fisinhed or no the quizz6



constructor() {}

  ngOnInit(): void {
    if(quiz_questions){
      this.finished = false
      this.title = quiz_questions.title  //Dynamic title with an if

      this.questions = quiz_questions.questions
      this.questionSelected = this.questions[this.questionIndex] //The array is starting in the questionIndex, shame thing that to start in the 0.
    //and the "this" in questionindex is necessary
     
    this.questionIndex = 0 //Just obling to start in the 0, same it already starting
     this.questionMaxIndex = this.questions.length   //The max position of the questions and the length is taking the amount questions

     //if had two console like as below, the first it would be the start pointer and the second it would be the amount
     //console.log (this.questionIndex)
     //console.log(this.questionMaxIndex)


  }

}

buttonPress(value:string){
  this.answers.push(value)
 this.nextStep()//Every time the user to call an answer
  
}

  async nextStep() {  //for the user to click and to go for the next way
   this.questionIndex+=1  //to grab the your own value and sum with more one

   if(this.questionMaxIndex > this.questionIndex){ //If not to find the max pointer 
 this.questionSelected = this.questions[this.questionIndex] //Take the collection questions that not is more zero
}else { //if already arrived in max
  const finalAnswer: string = await this.checkResult(this.answers)
  this.finished = true    //The await if for to calculator the array 
  this.anwersSelected = quiz_questions.results[finalAnswer as keyof
  typeof quiz_questions.results]  //The  finalAnswer is for to verify if is A or B, but the type any dont to read the string, so the keyof and typeof transform for to read

  
}

  }

  async checkResult(answers:string[]){
    const result = answers.reduce((previous, current, i, arr) => {
      if(
        arr.filter(item => item === previous ).length > 
        arr.filter(item => item === previous ).length  //The two is for to question [A, A, B, A] if it have more of one value equally
      ){
          return previous
      }else{
       return current
      }
    }) //for to reduce for an unique result
    return result  //for to return or A Or B +++
  }
     
}
