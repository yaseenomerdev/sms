export class FirebaseError {
  constructor(public message: string) {}

  static ParseError(code: string) {
    switch (code) {
      case "auth/invalid-email":
        return "Invalid email address";
      case "auth/user-disabled":
        return "User disabled";
      case "auth/user-not-found":
        return "User not found";
      case "auth/wrong-password":
        return "Wrong password";
      default:
        return "something went wrong";
    }
  }
}
