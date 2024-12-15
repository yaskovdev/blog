A class that meets the following requirements is a monad:

1. It has a constructor that takes a value of type `T`.
2. It implements the next interface:

   ```java
    interface Monad<T> {
        <U> Monad<U> flatMap(Function<T, Monad<U>> mapper);
    }
    ```
   
Or actually just use https://www.reddit.com/r/functionalprogramming/comments/13cnx5e/comment/jjn4iyx/ as the answer.