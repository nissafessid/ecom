import { Deserializable } from "./deserializable"

export class Product implements Deserializable{
    public productId: string;
    public Quantity?: number;
    public name?:String
    public prix?:Number
    public image?:String;
    public description?:String
    public WeightMeasure?: number;
    public WeightUnit?: string;
    public CurrencyCode?: string;
    public DateOfEntry?: string;
    public DateOfSale?: string;
    public qauntity_buy?:number;
    public ProductPicUrl?: string;
    public Status?: string;
    public category?: string;
    public SupplierName?: string;
    public deliveryPrice?: number;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }

    getWeight() {
        return this.WeightMeasure + ' ' + this.WeightUnit;
    }
}
