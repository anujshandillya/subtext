import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function CardWithForm(props: {tier: string, price: string, features: string, buttonTextDefault: string, buttonTextPaid: string, paid: string, textStyleClassName: string}) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className={props.textStyleClassName}>{props.tier}</CardTitle>
        <CardDescription className="py-6">{props.features}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-end">
        <CardTitle>{props.price}</CardTitle>
      </CardContent>
      <CardFooter className="flex justify-around items-center">
        <Button>{props.buttonTextDefault}</Button>
        {props.paid==="yes"?(
            <Button>{props.buttonTextPaid}</Button>
        ):""}
      </CardFooter>
    </Card>
  )
}
