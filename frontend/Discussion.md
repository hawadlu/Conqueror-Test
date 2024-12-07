<h1>Known issues</h1>
<ul>
<li>
Add employee modal closes after selecting a department if no other fields have been edited.
</li>
</ul>

<h1>Decisions</h1>
<h2>TanStack</h2>
As well as being required by the challenge tanstack provides nices reactive table and query functions.

<h2>Tailwind CSS</h2>
Also required by the project but provides some very nice CSS optimisations.

<h2>Axios</h2>
UseQuery does not provide any easy out of the box functionality for pot and post. Axios is a well-used library that provides these functions with async capability.

<h2>Focus Field</h2>
Consistently rendering the table causes the search and pagination fields to lose focus. I have implemented some custom focus logic to ensure that the selected on always remains focus, and none can steal focus from the other.

<h2>Structure</h2>
I have loosely tried to follow the MVC architecture by splitting components, although I did not manage to do it with them all.

<h2>UI/UX</h2>
I took design inspiration from tables that I found online and tried to use a minimalist approach. I'm not a designer so stick to something simple and unobtrusive was a must.