---
layout: post
title:  "Shape of your unit tests says a lot about their quality"
date:   2017-12-11 11:00:00 +0300
categories: java testing
comments: true
---

Whether you are writing your own unit tests or reviewing ones written by someone else, you can easily assess their quality by the shape of the test methods. You don't even need to read them.

### So what is the "rule of the shape"?

Good unit test method __always looks like a thin horizontal rectangle__, not like a square or a vertical rectangle. That's it.

<img alt="Good test method vs bad test method" src="/assets/good-test-method-vs-bad-test-method.png">

### Example of the bad test method

Let's first consider an example of the bad test method. Note that it has a shape of a square.

```java
@Test
public void render_forValidRequest_returnsExpectedModelAndView() {
    ExtendedModelMap model = new ExtendedModelMap();
    when(propertyFile.getString(Constants.PROP_ITEMS_MAX_LIMIT)).thenReturn("");
    List<Item> items = new ArrayList<>();

    Item item = getItem("389", "315-18-4584");
    items.add(item);

    Item item1 = getItem("388", "315-18-4585");
    items.add(item1);

    Item item2 = getItem("387", "315-18-4586");
    items.add(item2);

    when(facade.getItemsAccordingToType(any(String.class), any(String.class))).thenReturn(items);
    RedirectionResolver resolver = new RedirectionResolver();
    MenuItemsController controller = new MenuItemsController(facade, propertyFile, service, resolver);
    assertEquals("PersonalMenuItems", controller.render(model, renderRequest));

    MenuItemsForm itemsForm = (MenuItemsForm) model.get("itemForm");
    assertEquals("387", itemsForm.getItems().get(0).getItemCode());
    assertEquals(1, itemsForm.getItems().size());

    verify(context, times(3)).getUser();
    verify(user).getValue("USER_ID");
    verify(renderRequest).getPreferences();
    verify(preferences).getValue(Constants.ITEM_TYPE, StringPool.BLANK);
    verify(facade).getItemsAccordingToType(any(String.class), any(String.class));
}
```

What is wrong here? __Duplicates.__ The logic which prepares the testing object (together with its dependencies) and the logic which asserts the test results is usually similar for all the test methods. Imagine you made a change in the behavior of the tested object. It will be an extra work to go through all the test methods and change, say, the assertion logic for all of them.

### Example of the good test method

Let's refactor the above test method and note hove its shape changed.

```java
@Test
public void render_forValidRequest_returnsExpectedModelAndView() {
    ExtendedModelMap model = model();
    RenderRequest renderRequest = renderRequest();
    String view = testedObject().render(model, renderRequest);
    assertResult(model, view);
}
```

What did we change? First of all, we extracted mocks/fakes initialization to a separate methods (like `model()` or `renderRequest()`). Second, we did the same for the tested object initialization (extracted it to the `testedObject()`). And, finally, we moved the assertion logic to the method called `assertResult()`. Now, in case of changes in the behavior of the tested object, you have only one place to change in the unit tests.

### Summary

Unit test methods should have the shape of the horizontal rectangle. If this is not the case (e.g., they look more like a square or a vertical rectangle), this is a sign that you have duplicates in your unit tests. Refactor.

By the way, this rule can be applied to all methods. And even to classes. Though for classes the proportions may be _a bit_ "less horizontal".