```java
interface Monad<T> {
    Monad<T> unit(T value);
    <U> Monad<U> flatMap(Function<T, Monad<U>> mapper);
}
```