---
layout: post
title:  "Shape of your unit tests matters"
date:   2017-12-11 11:00:00 +0300
categories: java testing
comments: true
---

Whether you are writing your own unit tests or reviewing ones written by someone else, you can easily assess their quality by the shape of the test methods. You don't even need to read them.

### So what is the "rule of the shape"?

Good unit test class consists of methods which __look like a thin horizontal rectangle__, not like a square or a vertical one. That's it.

<img alt="Good test method vs bad test method" src="/assets/good-test-method-vs-bad-test-method.png">

### Example of the bad test method (18x13 cm)

```java
@Test
public void render_forValidRequest_returnsExpectedModelAndView() {
    ExtendedModelMap model = new ExtendedModelMap();
    when(propertyFile.getString(Constants.PROP_ITEMS_MAX_LIMIT)).thenReturn("");
    List<Item> items = new ArrayList<>();

    Item item = getItem("389", "40-143-940-8");
    items.add(item);

    Item item1 = getItem("388", "40-143-940-8");
    items.add(item1);

    Item item2 = getItem("387", "40-143-940-8");
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

### Example of the good test method (13x4 cm)

Let's refactor the above test method and have a look on its width and height again.

```java
@Test
public void render_forValidRequest_returnsExpectedModelAndView() {
    ExtendedModelMap model = model();
    RenderRequest renderRequest = renderRequest();
    String view = testedObject().render(model, renderRequest);
    assertResult(model, view);
}
```

What did we change? First of all, we extracted mocks/fakes initialization to a separate methods (like `model()` or `renderRequest()`). Second, we did the same for the tested object initialization (extracted it to the `testedObject()`). And, finally, we moved the assertion logic to the method called `assertResult()`.

### Summary

Unit test methods should have the shape of the horizontal rectangle. If this is not the case (e.g., they look more like a square or a vertical rectangle), this is a clear sign that you have duplicates in your unit tests. Feel free to refactor them.

By the way, this rule can be extrapolated from test methods to methods in general. And even to classes. Though for classes the proportions may be a bit different.