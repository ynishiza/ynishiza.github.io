# Essence of a system

The essence of a system is **complexity**.
Any non-trivial system is *inherently* complex.
Hence, complexity management is the essence of a quality system.

In turn, the essence of complexity management is **simplicity**: a simple system is one that can be *reasoned*.

Simplicity however is NOT an absence of complexity.
An ideal simple system is a *representation* of the **essential** complexity, most importantly in the data model.
Put another way, a simple system is the thing that remains after eliminating all the **accidental** complexity.

The world is never finished but is always evolving.
Thus, any non-trivial system is never done but must also be **evolvable** in accordance with the surrounding evolving world.
i.e. the system must be designed in a way that it can change and evolve (aka extensible/adaptable/evolvable/generality).

But change is inherently also a new form of complexity. Thus a well-designed system is a balance of conflicting forces:

- **simplicity**: a minimizing force converging towards the essential.
- **change**: a destructive force in order to accommodate the changing world.

Furthermore, a system is subject to the contingencies of real life that add complexity to the system design:

- scalability: increase in data volume, increase in users i.e. simultaneous access, latency, etc
- compatibility: versioning, backward compatibility


## Testability:

As the system evolves and becomes more complex, the **weight** of even a small change grows rapidly, as it becomes

- increasingly *critical* that the system does not break, since the larger the system, the greater the damage of a failure, but also
- increasingly *difficult* to prevent breakages, due to the greater complexity.

Thus, quality, reliable **tests** are vital for complexity management.
In turn, quality tests are possible only if the system is designed to be efficiently testable.

Furthermore, as the system evolves, it will inevitably also introduce **technical debt** i.e. accidental complexity.
But resolving technical debt often requires refactoring the code or data model, without breaking the existing system.
Thus, high quality tests are likewise critical here as well.


