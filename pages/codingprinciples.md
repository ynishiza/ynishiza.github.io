> “I'm a huge proponent of designing your code around the data, rather the other way around. [...] Bad programmers worry about the code. Good programmers worry about the data structures and their relationships”<br>
> Linus Torvalds

* Coding is 90% **model design**, 10% **code**: writing code is the easy part, model design (designing data structures, abstractions, interfaces, relationships, language, etc) the hard.\
  As long as the model is good, code can be fixed and needs to be fixable as many times as needed, as the program evolves.\
  On the other hand, all the perfect code in the world still cannot save the smallest speck of a bad model. On the contrary, it often only grows worse as more code is written.

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

----

* [The Zen of Python](https://peps.python.org/pep-0020/)

> Beautiful is better than ugly.<br>
> Explicit is better than implicit.<br>
> Simple is better than complex.<br>
> Complex is better than complicated.<br>
> Flat is better than nested.<br>
> Sparse is better than dense.<br>
> Readability counts.<br>
> Special cases aren't special enough to break the rules.<br>
> Although practicality beats purity.<br>
> Errors should never pass silently.<br>
> Unless explicitly silenced.<br>
> In the face of ambiguity, refuse the temptation to guess.<br>
> There should be one-- and preferably only one --obvious way to do it.<br>
> Although that way may not be obvious at first unless you're Dutch.<br>
> Now is better than never.<br>
> Although never is often better than *right* now.<br>
> If the implementation is hard to explain, it's a bad idea.<br>
> If the implementation is easy to explain, it may be a good idea.<br>
> Namespaces are one honking great idea -- let's do more of those!<br>

* [Rob Pike's 5 Rules of Programming](https://www.cs.unc.edu/~stotts/COMP590-059-f24/robsrules.html)

> Rule 1. You can't tell where a program is going to spend its time. Bottlenecks occur in surprising places, so don't try to second guess and put in a speed hack until you've proven that's where the bottleneck is.
>
> Rule 2. Measure. Don't tune for speed until you've measured, and even then don't unless one part of the code overwhelms the rest.
>
> Rule 3. Fancy algorithms are slow when n is small, and n is usually small. Fancy algorithms have big constants. Until you know that n is frequently going to be big, don't get fancy. (Even if n does get big, use Rule 2 first.)
>
> Rule 4. Fancy algorithms are buggier than simple ones, and they're much harder to implement. Use simple algorithms as well as simple data structures.
>
> Rule 5. Data dominates. If you've chosen the right data structures and organized things well, the algorithms will almost always be self-evident. Data structures, not algorithms, are central to programming.

