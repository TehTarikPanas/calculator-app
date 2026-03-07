import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bmi.component.html',
  styleUrls: ['./bmi.component.css'],
})
export class BmiComponent {
  weight: number | null = null;
  height: number | null = null;

  bmi: number | null = null;
  category: string = '';
  errorMessage: string = '';

  calculateBMI(): void {
    this.errorMessage = '';
    this.bmi = null;
    this.category = '';

    // Input validation
    if (this.weight === null || this.height === null || this.weight <= 0 || this.height <= 0) {
      this.errorMessage = 'Please enter valid positive values for weight and height.';
      return;
    }

    // Convert height from cm to meters
    const heightInMeters = this.height / 100;

    // BMI calculation
    const bmiValue = this.weight / (heightInMeters * heightInMeters);
    this.bmi = parseFloat(bmiValue.toFixed(2));

    // Determine BMI category
    if (this.bmi < 18.5) {
      this.category = 'Underweight';
    } else if (this.bmi >= 18.5 && this.bmi <= 24.9) {
      this.category = 'Normal';
    } else if (this.bmi >= 25 && this.bmi <= 29.9) {
      this.category = 'Overweight';
    } else {
      this.category = 'Obese';
    }
  }

  // Returns the CSS class name for styling based on BMI category
  getCategoryClass(): string {
    if (this.bmi !== null) {
      if (this.bmi < 18.5) {
        return 'underweight';
      } else if (this.bmi >= 18.5 && this.bmi <= 24.9) {
        return 'normal';
      } else if (this.bmi >= 25 && this.bmi <= 29.9) {
        return 'overweight';
      } else {
        return 'obese';
      }
    }
    return '';
  }
}
