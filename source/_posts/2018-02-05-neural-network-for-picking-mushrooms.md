---
layout: post
title:  "Neural Network For Picking Mushrooms"
date:   2018-02-05 11:00:00 +0300
categories: [scala, ann, knn]
comments: true
excerpt: "Imagine yourself in a forest picking mushrooms, either for fun or, probably more likely, so you won’t starve to death. How do you decide if a mushroom is edible or poisonous? Is there a way to utilize an artificial neural network to help you with the decision? If so, can you come up with a simpler, but more efficient solution? Let’s figure it out!"
---

Imagine yourself in a forest picking mushrooms, either for fun or, probably more likely, so you won't starve to death. How do you decide if a mushroom is edible or poisonous? Is there a way to utilize an artificial neural network to help you with the decision? If so, can you come up with a simpler, but more efficient solution? Let's figure it out!

{% asset_img mushrooms.jpg Mushrooms %}

### Test Data

Before we start, we need to study some mushrooms to collect the test data. Unfortunately, currently it is winter in my region, so at the moment, it is difficult for me to collect the mushrooms myself. But, luckily, the test data is already available in the [UC Irvine Machine Learning Repository](https://archive.ics.uci.edu/ml/datasets/mushroom).

I am splitting the data into two equal parts. The first part is called *training data*. It will be used to train the neural network. The second part is called *evaluation data*. It will be used to evaluate how well the neural network can classify unknown mushrooms as edible or poisonous.

### Artificial Neural Network: Design

The neural network should take a mushroom as an input and tell us whether or not it is edible or poisonous. The input layer of the neural network consists of a certain number of neurons. In our case, each neuron can take a value from 0 to 1 inclusively. The same for the output layer: it also has a given number of neurons, and each neuron can also return a value from 0 to 1 inclusively.

You can think of the neural network as a function. The function takes multiple parameters. Each parameter may vary from 0 to 1. The function returns multiple values, each of which also varies from 0 to 1.

First of all, let's decide how many neurons the input layer should have and how to represent a mushroom as the input.

Each mushroom has 22 features (cap shape, odor, veil color, etc.). Each feature can take from 2 to 12 values. For example, the veil color can be brown, orange, white or yellow.

There are [a number of ways](https://www.researchgate.net/post/How_to_code_categorical_inputs_for_a_neural_network) of how to "feed" any such mushroom to the neural network. I'm going to explain by example the method I picked for our mushroom problem.

Imagine for simplicity that each mushroom has only 2 features: veil type and veil color. The veil type can be _partial_ or _universal_, the veil color can be _brown_, _orange_, _white_ or _yellow_. These mushrooms can be described by the table below.

{% asset_img an-abstract-mushroom.png An Abstract Mushroom %}

Imagine I found a mushroom with the _partial white_ veil. This means I can substitute question marks with values. Each value will be 0 or 1. I have now updated the table below with the new values. The zeros and the ones now form the `(1, 0, 0, 0, 1, 0)` vector which I can pass on to the neural network.

{% asset_img the-mushroom-with-the-partial-white-veil.png The Mushroom With The Partial White Vei %}

Similarly, if it was the _universal yellow_ veil, the vector would be `(0, 1, 0, 0, 0, 1)`. I hope you get the idea now.

When I apply the above method to the actual 22 features, I have 126 neurons in the input layer. The same approach, applied to the output layer, gives me 2 neurons: the first represents the degree of edibility of a mushroom, the second represents how poisonous the mushroom is. If, for example, I deal with a very poisonous mushroom, the output is `(0, 1)`<sup>*</sup>.

{% asset_img output-layer.png An Abstract Output Layer %}

Having agreed on how to represent the inputs and the outputs of the neural network, let's then briefly discuss its type and its hidden layers.

I decided to use a multilayer perceptron network because it [fits well](https://en.wikipedia.org/wiki/Multilayer_perceptron) in the classification problem I am solving. I added a hidden layer, which is also called a dense layer. It is located between input and output layers and has ten neurons. Why ten? Well, there are many [rules of thumb](https://stats.stackexchange.com/questions/181/how-to-choose-the-number-of-hidden-layers-and-nodes-in-a-feedforward-neural-netw) about how to pick the number of the neurons in the hidden layer. The real value is always a matter of experimentation and optimization. I picked ten using one of these rules of thumb. It is a good value _to start with_.

### Artificial Neural Network: Training And Evaluation

Now that we have agreed on the configuration of the neural network, I am ready to build and train it. To do this, I will use [NeuroFlow](https://github.com/zenecture/neuroflow), a powerful Scala library to design, train, and evaluate neural networks.

{% asset_img training.png Training %}

After training the network through 900 iterations, I can now test the resulting neural network on the real data. The "real data" is the subset of the mushrooms that I had previously put aside and didn't use for the neural network training. The tests show that even without the optimization of the network parameters, **the proportion<sup>**</sup> of the correct answers is 0.92**, which is quite good.

Can I improve the result? Apparently, yes. For example, I still could play with the neural network configuration and find the best one. I also could deal with the training data [in the more optimal way](https://towardsdatascience.com/cross-validation-in-machine-learning-72924a69872f), not just by splitting it in half. However, there is another unexpectedly simple algorithm that shows _really_ good results for the mushrooms problem.

### K-Nearest Neighbours: The Main Idea

As we touched on above, let's utilize k-nearest neighbours and compare its results with the results of the neural network.

The idea of the algorithm is quite straightforward: given any unknown mushroom, I have to find the mushroom from my test data that is _the most similar_ to one I have to classify. Then the edibility of the most similar one will be the edibility I am trying to find.

The algorithm can be improved by picking multiple most-similar mushrooms, say, three. In this case, the edibility that most of these three mushrooms have is going to be the one I'm looking for.

### K-Nearest Neighbours: Similarity Of Two Mushrooms

The main thing I need to decide here is how to measure the similarity. There are [quite a few](https://en.wikipedia.org/wiki/Metric_(mathematics)) ways of how I can do it, but the [Hamming distance](https://en.wikipedia.org/wiki/Hamming_distance) method fits my needs very well. The Hamming distance between two mushrooms measures the number of features for which the mushrooms have different values. The smaller the Hamming distance, the more similar the mushrooms are.

If the first mushroom has the _brown_ cap and the _white_ stalk, and the second one also has the _brown_ cap, but the _gray_ stalk, the distance will be 1, as they differ only in one feature, only in the stalk color.

{% asset_img distance.png Distance %}

By the way, if I'm comparing two identical mushrooms, the number of features with different values is obviously 0, so the distance is also 0, as expected. Identical mushrooms are "as similar as possible".

### K-Nearest Neighbours: Implementation And Evaluation

In light of the above discussion, it is now trivial to implement the k-nearest neighbours algorithm:

```scala
class NearestNeighbor {

  def nearest(y: Seq[String], xs: Seq[Seq[String]], k: Int): String = {
    val knn = xs.sortWith((a, b) => distance(a.tail, y) < distance(b.tail, y)).slice(0, k)
    val edibleNumber: Int = knn.foldLeft(0)((count, element) => if (element.head == "e") count + 1 else count)
    if (edibleNumber > k / 2) "e" else "p"
  }

  private def distance(x: Seq[String], y: Seq[String]): Double = {
    x.zip(y).foldLeft(0.0)((sum, pair) => if (pair._1 == pair._2) sum else sum + 1.0)
  }
}
```

The algorithm does not even need the training phase. When I run the algorithm against the set of the evaluation data, I have a great result: **the proportion of the correct answers is 0.98**, even better than the neural network has shown.

### To Summarize

Neural networks are a powerful tool that can be applied in many different areas. They can even support you during mushroom-picking, as you have just seen. There is no magic behind them: a neural network is just a function of (usually) multiple arguments.

However, sometimes the simpler solution is the better. As I have just demonstrated, for the mushroom-picking problem, the k-nearest neighbours method shows even better result than the neural network.

The full implementation of both [the neural network](https://github.com/yaskovdev/data-science-sandbox/tree/master/mushrooms-neural-network) and [the k-nearest neighbours](https://github.com/yaskovdev/data-science-sandbox/tree/master/mushrooms-knn) is available in GitHub.

<sup>*</sup> In reality, it will be something like (0.00087, 0.99841). As I need to clearly state "edible" or "poisonous", I will just compare these 2 numbers. If the first value is larger, then I claim "edible", otherwise "poisonous".

<sup>**</sup> The ratio between the number of the correct answers given by the neural network and the total number of the mushrooms in the test data. This is the broadest and definitely not the best way to evaluate a model because it has a lot of disadvantages. For example, it does not pay attention to the proportion of the classes in the test data. However, because of its simplicity, it can be used for illustration purposes.
