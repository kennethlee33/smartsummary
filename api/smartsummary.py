import sys
import textwrap

from transformers import T5ForConditionalGeneration, T5Tokenizer

# Load the T5 model for summarization
model_name = "t5-base"
model = T5ForConditionalGeneration.from_pretrained(model_name)

# Load the T5 tokenizer
tokenizer = T5Tokenizer.from_pretrained(model_name)

# Example text input for summarization
input_text = sys.argv[1]

# print("Argv 1:" + str(input_text))

# Tokenize the input text
input_ids = tokenizer.encode(input_text, return_tensors="pt", max_length=1024, truncation=True)

# Generate the summary with T5
summary_ids = model.generate(input_ids, min_length=40, max_length=200, length_penalty=2.0, num_beams=4, early_stopping=True)

# Decode the generated summary
summary_text = tokenizer.decode(summary_ids[0], skip_special_tokens=True)

# Print the original input text and the generated summary

print(summary_text)