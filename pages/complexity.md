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


## Operation
Any non-trivial complex system, no matter how well designed, will encounter unexpected events and failures during operation.
And as the system becomes more complex, there is an increase in both the possible modes of failure, and the potential impact severity of each failure.
Thus, having a mechanism to monitor, detect (monitorability), and respond (observability, traceability, debuggability) is critical to managing complexity.

However, these mechanisms in turn also increase system complexity.

- **convergence**: a minimization of complexity towards simplicity. i.e. converging towards only the essential.
- **growth**: an expansion of complexity towards a greater strength, such as by generalization.

----

### [RCF1925 - The Twelve Networking Truths](https://datatracker.ietf.org/doc/html/rfc1925)

>(1)  It Has To Work.
>
>   (2)  No matter how hard you push and no matter what the priority,
>        you can't increase the speed of light.
>
>        (2a) (corollary). No matter how hard you try, you can't make a
>             baby in much less than 9 months. Trying to speed this up
>             *might* make it slower, but it won't make it happen any
>             quicker.
>
>   (3)  With sufficient thrust, pigs fly just fine. However, this is
>        not necessarily a good idea. It is hard to be sure where they
>        are going to land, and it could be dangerous sitting under them
>        as they fly overhead.
>
>   (4)  Some things in life can never be fully appreciated nor
>        understood unless experienced firsthand. Some things in
>        networking can never be fully understood by someone who neither
>        builds commercial networking equipment nor runs an operational
>        network.
>
>   (5)  It is always possible to aglutenate multiple separate problems
>        into a single complex interdependent solution. In most cases
>        this is a bad idea.
>
>   (6)  It is easier to move a problem around (for example, by moving
>        the problem to a different part of the overall network
>        architecture) than it is to solve it.
>
>        (6a) (corollary). It is always possible to add another level of
>             indirection.
>
>   (7)  It is always something
>
>        (7a) (corollary). Good, Fast, Cheap: Pick any two (you can't
>            have all three).
>
>   (8)  It is more complicated than you think.
>
>   (9)  For all resources, whatever it is, you need more.
>
>        (9a) (corollary) Every networking problem always takes longer to
> solve than it seems like it should.
>
>   (10) One size never fits all.
>
>   (11) Every old idea will be proposed again with a different name and
>        a different presentation, regardless of whether it works.
>
>        (11a) (corollary). See rule 6a.
>
>   (12) In protocol design, perfection has been reached not when there
>        is nothing left to add, but when there is nothing left to take
>        away.
