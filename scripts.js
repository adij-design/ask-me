const form = document.querySelector("#ask-form");
const promptInput = document.querySelector("#prompt");
const submitButton = document.querySelector("#submit-button");
const statusMessage = document.querySelector("#status");
const answerSection = document.querySelector("#answer");
const answerText = document.querySelector("#answer-text");

form.addEventListener("submit", async (event) => {
	event.preventDefault();

	const prompt = promptInput.value.trim();
	if (!prompt) return;

	submitButton.disabled = true;
	statusMessage.textContent = "Thinking...";
	answerSection.hidden = true;

	try {
		const response = await fetch("/api/ask", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ prompt })
		});
		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.error || "The request could not be completed.");
		}

		answerText.textContent = data.answer;
		answerSection.hidden = false;
		statusMessage.textContent = "";
	} catch (error) {
		statusMessage.textContent = error.message || "Something went wrong. Please try again.";
	} finally {
		submitButton.disabled = false;
	}
});
