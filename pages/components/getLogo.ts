import { el } from "@common-module/static-site-generator";

export default function getLogo() {
  const imageHeight = 40;

  const dataUrl =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAB+CAMAAADV/VW6AAAAAXNSR0IArs4c6QAAABJQTFRFAAAAIyMjAAAAXl5e////uIhkzZmsnAAAAAZ0Uk5TAP//////enng/gAAAQdJREFUaIHtmdsKgzAQBQX9/2/uSxAsobn0bE5iZsiLKIw7hRjocQAAAAAAJM4zrexluP260spdvl1PfOITP3MZbt8p/t22cont93CV61X65vjan6B5em0Ds74zvqp/5/SqAGa9Of7jTZwbgF0/2f7/+648gFlfaOuNX/PAyvpyW+ITf8P4c+35Yrldv85pRy+36yc77QxuYNabT/vN02sDmPWTxS8+EBt/sL75tKPtXzNZYACzvqoq8Ym/YXzvthP70TPrez64gfFrlkzu0fcFV5XvmVg4vVm/cvx/5Xa9s/xh/x/PrDfv85n3eY4YMPHM+u/CA4I/7MQnPvGJPzY+AAAAwFp8ALdqJ+mMzX9kAAAAAElFTkSuQmCC";
  return el(
    "a.logo",
    '<img height="' + imageHeight + '" src="' + dataUrl + '">',
    { href: "/" },
  );
}
