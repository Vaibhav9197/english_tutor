// app.js
const phrases = [
    "hello how are you",
    "what is your name",
    "I like to read books",
    "good morning everyone",
    "have a great day"
  ];
  
  let currentPhrase = ''; // Current phrase to be spoken
  
  // Retrieve saved progress or set to 0 if no progress is saved
  let correctAttempts = localStorage.getItem('correctAttempts') || 0;
  let totalAttempts = localStorage.getItem('totalAttempts') || 0;
  
  function getRandomPhrase() {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    currentPhrase = phrases[randomIndex];
    document.getElementById('targetText').textContent = `Say: "${currentPhrase}"`;
  }
  
  function startRecognition() {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Your browser does not support the Web Speech API');
      return;
    }
  
    getRandomPhrase(); // Generate a new random phrase
  
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
  
    recognition.start();
  
    recognition.onresult = function(event) {
      const transcript = event.results[0][0].transcript.toLowerCase(); // Get the spoken words
      const feedbackDiv = document.getElementById('feedback');
      feedbackDiv.innerHTML = '';
  
      totalAttempts++;
      
      if (transcript === currentPhrase) {
        correctAttempts++;
        feedbackDiv.innerHTML = `<span style="color:green;">Correct! Great pronunciation!</span>`;
      } else {
        feedbackDiv.innerHTML = `<span style="color:red;">You said: "${transcript}". Try again!</span>`;
      }
  
      // Simulate pronunciation feedback
      const pronunciationRating = Math.floor(Math.random() * 5) + 1;
      feedbackDiv.innerHTML += `<p>Your pronunciation score: ${pronunciationRating}/5</p>`;
  
      updateProgress();
      saveProgress();
    };
  
    recognition.onerror = function(event) {
      alert('Error occurred in recognition: ' + event.error);
    };
  }
  
  function updateProgress() {
    const progressDiv = document.getElementById('progress');
    const accuracy = ((correctAttempts / totalAttempts) * 100).toFixed(2);
    progressDiv.innerHTML = `Correct Attempts: ${correctAttempts} / ${totalAttempts} (Accuracy: ${accuracy}%)`;
  }
  
  function saveProgress() {
    localStorage.setItem('correctAttempts', correctAttempts);
    localStorage.setItem('totalAttempts', totalAttempts);
  }
  
  // Initialize progress on page load
  updateProgress();
  