import Notification from "../../@shared/notification/notification";

export default interface ProductInterface {
  get id(): string;
  get name(): string;
  get price(): number;
  notification: Notification;
}
