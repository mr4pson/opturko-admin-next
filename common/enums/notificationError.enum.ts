export enum NotificationError {
  BAD_REQUEST = "Отправлены неверные данные.",
  UNAUTHORIZED = "Вы не авторизованы.",
  FORBIDDEN = "У Вас недостаточно прав.",
  NOT_FOUND = "Запрашиваемые данные не найдены.",
  CONFLICT = "Такая запись уже существует.",
  INTERNAL_SERVER_ERROR = "Ошибка сервера.",
  BAD_GATEWAY = "Запрашиваемый сервер недоступен."
}
