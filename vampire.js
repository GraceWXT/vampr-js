class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  /** Adds the vampire as an offspring of this vampire. */
  addOffspring(vampire) {
    vampire.creator = this;
    this.offspring.push(vampire);
  }

  /** Returns the total number of vampires created by that vampire. */
  get numberOfOffspring() {
    return this.offspring.length;
  }

  /** Returns the number of vampires away from the original vampire this vampire is. */
  get numberOfVampiresFromOriginal() {
    let num = 0;
    let currentVampire = this;
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      num ++;
    }
    return num;
  }

  /** Returns an array of ancestors of this vampire, first element being itself and last element being the root. */
  get ancestor() {
    let arr = [this];
    let currentVampire = this;
    while (currentVampire.creator) {
      arr.push(currentVampire.creator);
      currentVampire = currentVampire.creator;
    }
    return arr;
  }

  /** Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire). */
  isMoreSeniorThan(vampire) {
    if (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) {
      return true;
    }
    return false;
  }

  /** Stretch.
    * Returns the closest common ancestor of two vampires. */
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    //Create an array of all the ancestors of 'this' (including 'this')
    const thisAncestor = this.ancestor;
    //Create an array of all the ancestors of 'vampire' (including 'vampire')
    const vampireAncestor = vampire.ancestor;
    //compare the elements in the two arrays and return the first match
    //since they are objects, it will only return true when they are one and the same
    for (let i = 0; i < vampireAncestor.length; i++) {
      for (let j = 0; j < thisAncestor.length; j++) {
        if (vampireAncestor[i] === thisAncestor[j]) {
          return vampireAncestor[i];
        }
      }
    }
  }
}

module.exports = Vampire;