---
categories: Haskell
title: Some notes in Haskell
---

# Functor

### `Instance Functor Maybe` or `Instance Functor (Maybe m)`?

*Functor* is a special *type class*, for we define Functor type class as:

```haskell
class Functor f where 
	fmap :: (a -> b) -> f a -> f b
```

In classical *type classes*, which is defined such as following:

```haskell
class Eq a where 
	(==) :: a -> a -> Bool 
	(/=) :: a -> a -> Bool 
	x == y = not (x /= y) 
	x /= y = not (x == y)
```

there *a* denotes a *type variable* which can be think as `Int`, `Double`, `Char` and so on. When we implement this type class, we use `instance` clause such as following:

```haskell
instance Eq TrafficLight where 
	Red == Red = True 
	Green == Green = True 
	Yellow == Yellow = True 
	_ == _ = False
```

where `TrafficLight` is a *concrete type*, 

Think of that a functor is also a type class, when we implement functor type class, we use following statements:

```haskell
instance Functor Maybe where 
	fmap f (Just x) = Just (f x) 
	fmap f Nothing = Nothing
```

**Question 1**: When we implement the `Eq` type class, we use a concrete type `TrafficLight`; but when we implement the `Functor` type class, why we can use `Maybe` which is just a *type constructor* and not a type?

**Answer**: Just as an answer in Stack Overflow question [What is a functor in functional programming](https://stackoverflow.com/questions/2030863/in-functional-programming-what-is-a-functor), we can just think `Maybe` as a more general type with some collective properties, it can take a type such as `Int` as its parameters and generate a new type `Maybe Int`, which is a concrete type not so general as type `Maybe` is.

So the right answer is `Instance Functor Maybe`.