---
layout: post
title:  "Neural Network For Picking Mushrooms"
date:   2018-02-05 11:00:00 +0300
image: /assets/placeholder.png
categories: scala ann knn
comments: true
---

Imagine yourself in a forest picking mushrooms, just for fun or, probably, not to starve to death. How do you decide if a mushroom is edible or poisonous? Is there a way to utilize a neural network to help you with the decision? And, finally, can you come up with a simpler, but more efficient solution? Let's figure it out!

### Test Data

Before we start, we need to study some mushrooms to collect the test data. Unfortunately, currently there is a winter in my region, so at the moment it is difficult for me to collect the data myself. But, luckily, the test data is already available in the [UC Irvine Machine Learning Repository](https://archive.ics.uci.edu/ml/datasets/mushroom).

### Artificial Neural Network

I am splitting the data into 2 equal parts. The first part is called *training data*. It will be used to train the neural network. The second part is called *evaluation data*. It will be used to evaluate how well the neural network can classify unknown mushrooms as edible or poisonous.

The neural network should take a mushroom as a parameter and say if it is edible or poisonous. The input layer of the neural network consists of a certain number of the neurons. In our case, each neuron can get a value from 0 to 1 inclusively. The same for the output layer: it has a given number of neurons, each neuron can take a value from 0 to 1 inclusively.

Let's, first of all, decide, how many neurons the input layer should have and how to represent a mushroom as the input.

Each mushroom has 22 features (like cap shape, odor, veil color, etc.). Each feature can take from 2 to 12 values. For example, the veil color can be brown, orange, white or yellow.

There is [a number of ways](https://www.researchgate.net/post/How_to_code_categorical_inputs_for_a_neural_network) how to "feed" such mushroom to the neural network. It will be quite easy to explain by the simplified example the way I picked for our task.

Imagine for simplicity that each mushroom has only 2 features: veil type and veil color. Veil type can be partial or universal, veil color can be brown, orange, white or yellow. Such potential mushroom can be described by the below table. For the concrete mushroom I meet in the forest I can replace question marks with a value. The value will be 0 or 1.

<img alt="A Mushroom" src="{{ site.url }}/assets/a-mushroom.png">

Imagine I met the mushroom with the partial white veil. Then the table will look like on the next picture. The 0's and the 1's form the `(1, 0, 0, 0, 1, 0)` vector which will be passed to the neural network.

<img alt="The Concrete Mushroom" src="{{ site.url }}/assets/first-mushroom.png">

If it was the universal yellow veil, the vector would be `(0, 1, 0, 0, 0, 1)`. I hope you can catch the idea now.

Applying the above approach for the real (slightly bigger) number of features, I have the 126 neurons in the input layer. The same approach, applied to the output layer, gives me 2 neurons: the first represents the degree of edibility of a mushroom, the second represents the degree of poisonousness. If, for example, I deal with the poisonous mushroom, the output will be `(0, 1)`<sup>*</sup>.

<img alt="Output Layer" src="{{ site.url }}/assets/output-layer.png">

I decided to use perceptron as the type of the network because it [fits well](https://en.wikipedia.org/wiki/Perceptron) the classification problem I am solving. I added the third layer, which is called the dense layer. It is located between input and output layers and has ten neurons. Why ten? Well, there are a [lot of rules of thumb](https://stats.stackexchange.com/questions/181/how-to-choose-the-number-of-hidden-layers-and-nodes-in-a-feedforward-neural-netw) how to pick the number of the neurons in the hidden layer. The real value is always a matter of experiments and optimization. I picked ten using one of such rules of thumb. It is a good value to start with.

Now, as we agreed on the configuration of the neural network, I already can try to build and train it. To do this I will use [NeuroFlow](https://github.com/zenecture/neuroflow), a powerful Scala library to design, train and evaluate neural networks.

<img alt="The Concrete Mushroom" src="{{ site.url }}/assets/training.png">

After the training that took 900 iterations, I can now test the resulting neural network on the real data. The "real data" is the subset of the mushrooms that I had, but it was previously put aside and not used during the neural network training. The tests show that even without the optimization of the network parameters, **the rate<sup>**</sup> of the correct answers is 0.92**, which is quite good.

### K Nearest Neighbours

As a small bonus, let's try another algorithm, which is super simple, but shows unexpectedly good results for some tasks. Namely, let's utilize k-nearest neighbours and compare its results with results of the neural network.

The idea of the algorithm is really straightforward: given a mushroom about which I don't know if it is edible or poisonous, I have to find the mushroom from my test data that is the most similar to one I have to classify. Then the edibility of the most similar one will be the edibility I am trying to find.

The algorithm can be improved by picking multiple most similar mushrooms, say, 3. In this case, the class, that the most of the similar mushrooms have, is going to be the one we are looking for.

The main thing I need to decide here is how to measure the similarity. There are [quite a few](https://en.wikipedia.org/wiki/Metric_(mathematics)) ways how I can do it, but the [Hamming distance](https://en.wikipedia.org/wiki/Hamming_distance) fits my needs very well. The "distance" between two mushrooms will be a number of features in which the mushrooms have different values. The shorter the distance, the more similar the mushrooms are. If the first one has the brown cap and the white stalk, and the second one also has the brown cap, but the gray stalk, the distance will be 0 + 1 = 1. If we are comparing 2 identical mushrooms, the number of features with different values is, obviously, 0, so the distance also is 0, as expected.

In the light of the above, it is now trivial to implement the algorithm:

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

The algorithm even does not need the training phase. When I run the algorithm against the set of the evaluation data, I have the very good result: **the rate of the correct answers is 0.98**, even better than the neural network can propose.

### To Summarize

Next time when I will go to a forest, I will test the model on the real data. It does not work in 100% of cases. However, that is natural: if there is a model that covers 100% cases, it is a sign that most likely something went wrong.

<sup>*</sup> In reality it will be something like (0.00087, 0.99841). As I need to clearly state "edible" or "poisonous", I will just compare these 2 numbers. If the first is bigger, then I claim "edible", otherwise "poisonous".

<sup>**</sup> The rate is just the ratio between the number of the correct answers given by the neural network and the total number of the mushrooms in the test data. This is the most naive way to evaluate a model. It has a lot of disadvantages. For example it does not pay attention to the proportion of the classes in the test data. However because of its simplicity it can be used for illustration purposes.