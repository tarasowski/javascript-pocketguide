// map :: Functor f => (a -> b) -> f a -> f b
// map :: Functor f => (String -> b ) -> f String -> f b
// map :: Functor f => (String -> Integer) -> f String -> f Integer
// map :: (String -> Integer) -> Array String -> Array Integer
S.map (s => s.length) (["foo", "bar", "baz", "quux"])


// map :: Functor f => (a -> b) -> f a -> f b
// map :: (a -> b) -> Either x a -> Either x b
// map :: (String -> Integer) -> Either x String -> Either x Integer
// map :: (String -> Integer) -> Either Error String -> Either Error Integer


// map :: Functor f => (a -> b) -> f a -> f b
// -> is a syntatic sugar, instead of (a -> b) we can write Function a b
// map :: (a -> b) -> Function x a -> Function x b
// map :: (b -> c) -> (a -> b) -> (a -> c)
const map = f => g => (x => f(g(x)))

// Here you can find the type classes hierarchy: https://github.com/sanctuary-js/sanctuary-type-classes
