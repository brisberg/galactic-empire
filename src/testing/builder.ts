/**
 * @fileoverview
 * Builder base class is used to construct various objects for use in unit
 * tests.
 */
export interface Builder<T> {
  /** Constructs a concrete instance from the state of the builder. */
  build(): T;
}
