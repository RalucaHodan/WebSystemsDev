import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
const baseUrl = 'https://opentdb.com/api.php?';

interface Answer {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string;
  question: string;
}

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.scss'],
})
export class TriviaComponent implements OnInit {
  public categoryOptions = [
    { description: 'Any category', value: null },
    { description: 'General', value: 9 },
    { description: 'Entertainment: Movie', value: 11 },
  ];

  public difficultyOptions = [
    { description: 'Easy', value: 'easy' },
    { description: 'Medium', value: 'medium' },
    { description: 'Hard', value: 'hard' },
  ];
  public triviaForm: FormGroup = new FormGroup({
    numberOfQuestions: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    difficulty: new FormControl('', Validators.required),
  });

  public questionsForm: FormGroup;

 public questionsList: Answer[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.error('trivia');
    console.error(this.triviaForm);
  }

  onGenerateGame() {
    const rawValue = this.triviaForm.getRawValue();
    const obj = {
      amount: rawValue.numberOfQuestions,
      category: rawValue.category.value ? rawValue.category.value.toString(): null,
      'difficulty=': rawValue.difficulty.value,
    };

    let params;
    console.error(rawValue.category.value)
    if(rawValue.category.value) {
      params = new HttpParams()
      .set('amount', rawValue.numberOfQuestions)
      .set('category', rawValue.category?.value?.toString())
      .set('difficulty', rawValue.difficulty.value)
      .set('type', 'boolean')
    } else {
      params = new HttpParams()
      .set('amount', rawValue.numberOfQuestions)
      .set('difficulty', rawValue.difficulty.value)
      .set('type', 'boolean')
    }
   
    const url = `${baseUrl}`;
    
    this.http.get(url, { params }).subscribe((questions: any) =>{
      this.questionsList = questions.results; 

      console.error(this.questionsList)
    })

    

    console.error(this.triviaForm);
  }
}
