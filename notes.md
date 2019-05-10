# Walkthrough

### Coding Exercise

1. Introduce exercise
   - Creating a feedback app
   - Using react testing library, small explanation
2. should indicate that the user has selected a reaction
   - Find by text happy
   - click
   - expect happy to have a 'selected' class
3. should not allow the user to select more than one reaction
   - Find by text happy
   - click
   - expect happy to have a 'selected' class
4. should let the user know his feedback was submitted successfully
   - Find by text happy
   - click
   - find submit button
   - click
   - expect client to display Successfully submitted message on success
   - expect client to have been called with 'happy'
5. should let the user know if he tries to feedback without a reaction
   - find submit button
   - click
   - expect client to not have been called
   - expect error to be in the document (maybe explain extend-expect for jest-dom)
6. Modify buttons to be images with fontawesome
   - find by alt-text instead of text
   - switch button to span and fontawesome icon
7. Now we show an example enzyme failing test
   - run the enzyme tests. Both test suites should pass
   - extract the span and font awesome icons to their own components and show that the tests still pass
   - run the enzyme test. it should fail
   - We could change enzyme to mount instead of shallow rendering, RTL/DTL doesn't allow you to do those sorts of things.

### Runtimes

- 30 min
- 15 min
- 25 min
- 28 min
