using Eco.Utilities.Inventory.Domain.Entities;
using Eco.Utilities.Inventory.Domain.Entities.Certification;
using Eco.Utilities.Inventory.Domain.Models.Brand;
using Eco.Utilities.Inventory.Domain.Models.Inventory;
using Eco.Utilities.Inventory.Domain.Models.InventoryAccount;
using Eco.Utilities.Inventory.Domain.Models.Manufacturer;
using Eco.Utilities.Inventory.Domain.Models.ProductDetails;
using Eco.Utilities.Inventory.Domain.Models.ProductGroup;
using Eco.Utilities.ViewModels;
using Newtonsoft.Json;

namespace Eco.Utilities.Inventory.Domain.Models.Product
{
    public class ProductResponseDTO : CreateOrEditResponse
    {
        [JsonProperty("id")]
        public long Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("content")]
        public string Content { get; set; }

        [JsonProperty("type")]
        public ProductType Type { get; set; }

        [JsonProperty("net_weight")]
        public double NetWeight { get; set; }

        [JsonProperty("volumetric_weight")]
        public double VolumetricWeight { get; set; }

        [JsonProperty("sku")]
        public string SKU { get; set; }

        [JsonProperty("upc")]
        public string UPC { get; set; }

        [JsonProperty("ean")]
        public string EAN { get; set; }

        [JsonProperty("mpn")]
        public string MPN { get; set; }

        [JsonProperty("packaging_type")]
        public Packaging PackagingType { get; set; }

        [JsonProperty("green_rating")]
        public double GreenRating { get; set; }

        [JsonProperty("brand")]
        public BrandResponseDTO Brand { get; set; }

        [JsonProperty("manufacturer")]
        public ManufacturerResponseDTO Manufacturer { get; set; }

        [JsonProperty("group_description")]
        public Dictionary<string, string>? GroupDescription { get; set; }

        [JsonProperty("product_group")]
        public ProductGroupResponseDTO ProductGroup { get; set; }

        [JsonProperty("category_fk")]
        public long CategoryFk { get; set; }

        [JsonProperty("status")]
        public ProductStatus Status { get; set; }

        [JsonProperty("product_certifications")]
        public List<ProductCertificationResponseDTO> ProductCertifications { get; set; }

        [JsonProperty("product_gallery")]
        public List<ProductGalleryEntity> ProductGallery { get; set; }

        [JsonProperty("product_details")]
        public List<ProductDetailsResponseDTO> ProductDetails { get; set; }

        [JsonProperty("inventory")]
        public List<InventoryResponseDTO> Inventory { get; set; }
    }
}