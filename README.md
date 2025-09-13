# Sprint 1: TypeScript CSV

### Task C: Proposing Enhancement

- #### Step 1: Brainstorm on your own.
    - currently can't handle foreign inputs
    - can't recognize versions of the same input (ex. 30 vs thirty)
    - no type structure for inputs
    - headers are not ignored when parsing

- #### Step 2: Use an LLM to help expand your perspective.
    I first prompted the LLM with the exact prompt on the handout, which returned detailed suggestions:

    - handle edges cases such as delimiters(", , .), header rows, row width & shape, whitespace, and special characters
    - type handling with type inference, and type validation with schema-driven parsing with Zod
    - catering to API shapes that scale, with input forms and streaming
    - security considerations to prevent csv injections, by prefexing cells starting with suspicious characters

    The LLM and I both agreed on recognizing edge cases/foreign input, and in taking care of type handling, but they provided more insightful suggestions concerning security and API specific input forms.

    Without more specific context about the purpose/data that our parser serves, the LLM missed suggestions more relevant to our use case. For example, not knowing how to handle different forms of the same inputs.

    I then prompted it with these variations:
    1. I’m working on a CSV parser in TypeScript that currently accepts a filename as input and converts rows into strings or objects, for academic and research use cases. What other missing features or edges am I missing that a CSV parser traditionally has in this scenario?
    2. I’m working on a CSV parser in TypeScript that currently accepts a filename as input and converts rows into strings or objects, for all general use cases. Provide me with edge cases regarding security and compatability with all possible use cases.

    In both these variations, I tried to be more specific with what the parser may be used for, in hopes that it will make the answers more insightful and relevant. With the first prompt focused on academic uses, the LLM suggested the parser be ergonomic and easy to plug into data pipelines, emphasized data correctness and scalability. With the second prompt focused on more general cases, it still brought up compatability concerns, in addition to emphasizing focusing on all edge cases and security, suggesting path and file handling, prototype pollution when mapping to objects, csv injection prevention, and encoding attacks.

- #### Step 3: use an LLM to help expand your perspective.

    Include a list of the top 4 enhancements or edge cases you think are most valuable to explore in the next week’s sprint. Label them clearly by category (extensibility vs. functionality), and include whether they came from you, the LLM, or both. Describe these using the User Story format—see below for a definition. 

    Include your notes from above: what were your initial ideas, what did the LLM suggest, and how did the results differ by prompt? What resonated with you, and what didn’t? (3-5 sentences.) 

    Top 4 enhancements:
    - extensibility (idea came from me and LLM): as a user, I can account for not including the header in the prased csv so that outputs are clean
    - extensibility (idea came from me and LLM): as a user, I can account for special characters within inputs to ensure that all entries are clean 
    - functionality (idea came from me and LLM): as a user, I can account for delimiters to ensure that the data is parsed correctly without interruption
    - functionality (idea came from me and LLM): as a user, I can make sure that inputs are valid to the use case by creating schemas to fit input types

    My initial ideas mainly concerned type handling and having valid inputs themselves, but the LLM helped me think of other cases that csv parsers may need to handle such as security and compatibility with other use cases. The results differed by prompt when I specified what exactly we will be using the csv parser for and the LLM responded with catered results, such as suggesting scalable modifications for larger audiences. The security concerns and validation of my type handling concerns resonated me, and more nitty gritty suggestions such as API compatability did not.


### Design Choices

### 1340 Supplement

- #### 1. Correctness

- #### 2. Random, On-Demand Generation

- #### 3. Overall experience, Bugs encountered and resolved
#### Errors/Bugs:
#### Tests:
#### How To…

#### Team members and contributions (include cs logins):

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI):
#### Total estimated time it took to complete project:
#### Link to GitHub Repo:  
