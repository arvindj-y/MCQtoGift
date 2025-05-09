function generateQuestionBlocks() {
  const numQuestions = parseInt(document.getElementById("numQuestions").value.trim());
  const container = document.getElementById("questionsContainer");

  // Clear existing question blocks
  container.innerHTML = "";

  if (isNaN(numQuestions) || numQuestions < 1) {
    alert("Please enter a valid number of questions.");
    return;
  }

  // Create the specified number of question blocks
  for (let i = 1; i <= numQuestions; i++) {
    const questionDiv = document.createElement("div");
    questionDiv.className = "question-container";

    // Add question fields
    questionDiv.innerHTML = `
            <button type="button" class="remove-btn" onclick="removeQuestion(this)">Remove</button>
            <label>Question ${i}:</label>
            <input type="text" name="question" placeholder="Enter the question">
            <input type="text" name="option1" placeholder="Option 1">
            <input type="text" name="option2" placeholder="Option 2">
            <input type="text" name="option3" placeholder="Option 3">
            <input type="text" name="option4" placeholder="Option 4">
            <input type="text" name="correctOption" placeholder="Correct Option (number)">
            <textarea name="feedback" placeholder="General Feedback"></textarea>
        `;

    container.appendChild(questionDiv);
  }
}

function removeQuestion(button) {
  const container = document.getElementById("questionsContainer");
  container.removeChild(button.parentElement);
}

function generateGIFT() {
  const form = document.getElementById("questionsForm");
  const containers = form.getElementsByClassName("question-container");
  let giftContent = "";

  Array.from(containers).forEach((container) => {
    const question = container.querySelector('input[name="question"]').value.trim();
    const options = [
      container.querySelector('input[name="option1"]').value.trim(),
      container.querySelector('input[name="option2"]').value.trim(),
      container.querySelector('input[name="option3"]').value.trim(),
      container.querySelector('input[name="option4"]').value.trim(),
    ];
    const correctOption = parseInt(container.querySelector('input[name="correctOption"]').value.trim()) - 1;
    const feedback = container.querySelector('textarea[name="feedback"]').value.trim();

    // Validate that question and options are provided and the correct option is within range
    if (question && options.every(option => option) && correctOption >= 0 && correctOption < options.length) {
      giftContent += `${question} {\n`;  // Start the question block

      options.forEach((option, index) => {
        // Format options: '=' for correct, '~' for incorrect
        giftContent += `  ${index === correctOption ? "=" : "~"}${option}\n`;
      });

      // Include feedback if provided
      if (feedback) {
        giftContent += `  #### ${feedback}\n`;  // GIFT feedback
      }

      giftContent += `}\n\n`;  // End the question block
    }
  });

  // Check if the giftContent is empty (no valid questions were added)
  if (!giftContent) {
    alert("Please fill out all fields correctly.");
    return;
  }

  // Create the GIFT file and trigger download
  const blob = new Blob([giftContent], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "questions.txt";
  a.click();
  URL.revokeObjectURL(url);
}
