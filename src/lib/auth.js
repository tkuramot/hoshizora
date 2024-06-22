const getFirebaseErrorMessage = (errorCode) => {
  const errorMessages = {
    "auth/email-change-needs-verification": "メール変更には確認が必要です。",
    "auth/email-already-in-use": "このメールアドレスは既に使用されています。",
    "auth/expired-action-code": "アクションコードの有効期限が切れています。",
    "auth/internal-error": "内部エラーが発生しました。",
    "auth/invalid-email": "無効なメールアドレスです。",
    "auth/invalid-credential": "無効な認証情報です。",
    "auth/missing-password": "パスワードが必要です。",
    "auth/wrong-password": "パスワードが間違っています。",
  };

  const userMessage = errorMessages[errorCode] ||
    "不明なエラーが発生しました。";

  return userMessage;
};

export { getFirebaseErrorMessage };
