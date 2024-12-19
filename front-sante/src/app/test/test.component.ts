import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {

  constructor(private router: Router) {}


  navigateTo(route: string) {
    this.router.navigate([route]);
  }
  
  
  logout() {
    
    this.router.navigate(['/login']);
    console.log('User logged out');
  }

  questions = [
    {
      question: 'How often do you exercise?',
      answers: [
        'Never',
        'Occasionally',
        'Regularly',
        'Daily'
      ],
      selectedAnswer: ''
    },
    {
      question: 'How would you describe your diet?',
      answers: [
        'Unhealthy',
        'Balanced',
        'Healthy',
        'Very Healthy'
      ],
      selectedAnswer: ''
    },
    {
      question: 'How many hours of sleep do you get on average?',
      answers: [
        'Less than 5 hours',
        '5-7 hours',
        '7-9 hours',
        'More than 9 hours'
      ],
      selectedAnswer: ''
    },
    // Add more questions as needed
  ];

  // To track the current question index
  currentQuestionIndex = 0;

  // Method to go to the next question
  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    } else {
      this.showResults();
    }
  }

  // Method to handle the test results
  showResults() {
    const results = this.questions.map((question, index) => {
      return `${question.question} Answered: ${question.selectedAnswer}`;
    });
    alert('Test Complete!\n' + results.join('\n'));
  }
}
