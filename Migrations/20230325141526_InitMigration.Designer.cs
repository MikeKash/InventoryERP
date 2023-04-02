﻿// <auto-generated />
using System;
using InventoryERP.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace InventoryERP.Migrations
{
    [DbContext(typeof(InventoryERPContext))]
    [Migration("20230325141526_InitMigration")]
    partial class InitMigration
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("InventoryERP.Models.Address", b =>
                {
                    b.Property<int>("AddressID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("AddressID"));

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("PostalCode")
                        .IsRequired()
                        .HasColumnType("nvarchar(6)");

                    b.Property<string>("State")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("StreetAddress")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.HasKey("AddressID");

                    b.ToTable("Addresses");
                });

            modelBuilder.Entity("InventoryERP.Models.Item", b =>
                {
                    b.Property<Guid>("ItemID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("ItemDescription")
                        .IsRequired()
                        .HasColumnType("nvarchar(200)");

                    b.Property<string>("ItemNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(25)");

                    b.Property<string>("ItemUM")
                        .IsRequired()
                        .HasColumnType("nvarchar(5)");

                    b.Property<string>("MaxInventory")
                        .IsRequired()
                        .HasColumnType("nvarchar(10)");

                    b.Property<string>("MinInventory")
                        .IsRequired()
                        .HasColumnType("nvarchar(10)");

                    b.HasKey("ItemID");

                    b.ToTable("Items");
                });

            modelBuilder.Entity("InventoryERP.Models.PurchaseOrderDetail", b =>
                {
                    b.Property<Guid>("PurchaseOrderDetailID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<decimal>("ItemGrandTotal")
                        .HasColumnType("decimal(18,2)");

                    b.Property<Guid>("ItemID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<decimal>("ItemPrice")
                        .HasColumnType("decimal(18,2)");

                    b.Property<Guid>("PurchaseOrderMasterID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("QtyOrdered")
                        .HasColumnType("int");

                    b.Property<int>("QtyReceived")
                        .HasColumnType("int");

                    b.HasKey("PurchaseOrderDetailID");

                    b.HasIndex("ItemID");

                    b.HasIndex("PurchaseOrderMasterID");

                    b.ToTable("PurchaseOrderDetailss");
                });

            modelBuilder.Entity("InventoryERP.Models.PurchaseOrderMaster", b =>
                {
                    b.Property<Guid>("PurchaseOrderMasterID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("OrderDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("OrderDueDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("OrderNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(75)");

                    b.Property<decimal>("POGrandTotal")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("POTerms")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<Guid>("SupplierID")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("PurchaseOrderMasterID");

                    b.HasIndex("SupplierID");

                    b.ToTable("PurchaseOrdersMaster");
                });

            modelBuilder.Entity("InventoryERP.Models.Supplier", b =>
                {
                    b.Property<Guid>("SupplierID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("AddressID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("AddressID1")
                        .HasColumnType("int");

                    b.Property<string>("SupplierCountry")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("SupplierName")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("SupplierID");

                    b.HasIndex("AddressID1");

                    b.ToTable("Suppliers");
                });

            modelBuilder.Entity("InventoryERP.Models.User", b =>
                {
                    b.Property<Guid>("UserID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<byte[]>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("RefreshToken")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("TokenCreated")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("TokenExpires")
                        .HasColumnType("datetime2");

                    b.Property<string>("UserEmail")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserID");

                    b.HasIndex("UserEmail")
                        .IsUnique();

                    b.ToTable("Users");
                });

            modelBuilder.Entity("InventoryERP.Models.PurchaseOrderDetail", b =>
                {
                    b.HasOne("InventoryERP.Models.Item", "Item")
                        .WithMany()
                        .HasForeignKey("ItemID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("InventoryERP.Models.PurchaseOrderMaster", null)
                        .WithMany("PurchaseOrderDetails")
                        .HasForeignKey("PurchaseOrderMasterID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Item");
                });

            modelBuilder.Entity("InventoryERP.Models.PurchaseOrderMaster", b =>
                {
                    b.HasOne("InventoryERP.Models.Supplier", "Supplier")
                        .WithMany()
                        .HasForeignKey("SupplierID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Supplier");
                });

            modelBuilder.Entity("InventoryERP.Models.Supplier", b =>
                {
                    b.HasOne("InventoryERP.Models.Address", "Address")
                        .WithMany()
                        .HasForeignKey("AddressID1")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Address");
                });

            modelBuilder.Entity("InventoryERP.Models.PurchaseOrderMaster", b =>
                {
                    b.Navigation("PurchaseOrderDetails");
                });
#pragma warning restore 612, 618
        }
    }
}
