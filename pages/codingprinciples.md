> “I'm a huge proponent of designing your code around the data, rather the other way around. [...] Bad programmers worry about the code. Good programmers worry about the data structures and their relationships”  Linus Torvalds

* Coding is 90% **design**, 10% **code**: writing code is the easy part, design (designing data structures, interfaces, relationships, language, etc) the hard.\
  As long as the design is good, code can be fixed and needs to be fixable as many times as needed, as the program evolves.\
  On the other hand, all the perfect code in the world still cannot save the smallest speck of a bad design. On the contrary, it often only grows worse as more code is written.

* Code is a **language**: it consists of a set of basic *elements* (i.e. the terms of the language, such as the keywords, primitive types, functions, classes, etc), and a *combination* of these elements (i.e. the phrases of the language according to its grammar, such as expressions, patterns, repetitions, etc).\
  Code has a dual, often conflicting, audience: it needs to serve both *humans* and *machines*. Humans to read, write, maintain, etc code, and machines to process code.\
  Thus code is a constant tension between serving *human requirements* vs *machine requirements*.\
  e.g. whether to prioritize code semantics (human) over performance (machine).\
  But in general, favor **human > machine**: machine problems are often easier to fix and can be fixed systematically. \
  e.g. performance problems can be fixed by a more powerful machine, but spaghetti code cannot.\
  Also, as long as it is humans writing the code, what is bad for humans often end up causing more harm than good for the machine as well in the end, if not immediate.\
  * corollary: **semantics (human)** > **performance (machine)**:
  * **non-readable-code-principles**: more *abstraction* (e.g. functions, classes, etc) is not unconditionally good, may be worse than no abstraction in some cases.
  That is, it depends.\
  e.g. higher complexity, inconsistent abstraction, premature abstraction, abstraction leakage, etc.
  * **non-DRY**: *repetition* (aka duplication, replication, redundancy, etc) is not unconditionally bad, may be good in some cases.
  That is, it depends.\
  Indeed, *patterns* are a form of repetition.


* **data structure** > **interface** > code\
  Data structure is *fixed*, hence essential and expensive to change. Code, on the other hand, is more incidental i.e. there are often multiple ways of achieving the same result and the choice isn't critical.\
  Indeed, we need to write code *against* the data structure, but not vice versa.\
  And we can change the code without changing the data structure, but not vice versa.\
  [Linus Torvalds: “Bad programmers worry about the code. Good programmers worry about the data structures and their relationships”](https://lwn.net/Articles/193245/)

* **YAGNI** (You Aint Gonna Need IT)

* coherent code and logic > distinct originality and cleverness
