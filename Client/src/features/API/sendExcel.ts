

export async function sendExcel(event: React.ChangeEvent<HTMLInputElement>) {
    const url = process.env.NEXT_PUBLIC_CATALOG_API;
    const files = event.target.files;

    if(!files || !url)
        return;

    const file = files[0];

    const fullUrl = url + "/product/import"

    const formData = new FormData();
    formData.append("file", file);

    await fetch(fullUrl, {
        method: "POST",
        body: formData,
    });

    window.location.reload();
}