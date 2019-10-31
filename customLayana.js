<script>
    $(document).ready(() => {
        const script = document.createElement('script');
        script.src = 'https://www.style.me/styleme-api/en.styleme-retailer.js?t=1234666';
        document.body.appendChild(script);

        let styleSdkIns;
        const wrapper = $('div[data-hook=main-media-image-wrapper]')[0];
        const dataRetailerSku = $('div[data-hook="sku"]').text().split(':')[1].trim();
        let dataRetailerColor = $('label[data-hook=color-sample] > input').attr('aria-label');
        window.styleMeAsyncInit = (StyleMeSDK) =>
        {
            console.log('start styleMeAsyncInit');
            wrapper.setAttribute('data-retailer-color', dataRetailerColor);
            wrapper.setAttribute('data-retailer-sku', dataRetailerSku);

            // const myDiv = document.createElement('div');
            // const item2 = $('div[data-hook=product-options]')[0];
            // myDiv.setAttribute('id', 'alternative-tryon');
            // myDiv.setAttribute('data-retailer-color', dataRetailerColor);
            // myDiv.setAttribute('data-retailer-sku', dataRetailerSku);
            // item2.append(myDiv);

            styleSdkIns = new StyleMeSDK({
                retailerID: 'e8992b66-57dd-44b8-be4a-c873b6085c22',
            });

            styleSdkIns.createTryOnButtons();
        };

        $('label[data-hook=color-sample] > input').on('click', (e) => {
            e.stopPropagation();
            if (undefined !== styleSdkIns)
            {
                dataRetailerColor = $(e.target).attr('aria-label');
                wrapper.setAttribute('data-retailer-color', dataRetailerColor);
                if (wrapper.querySelectorAll('.style-me-btn-wrap')[0])
                {
                    wrapper.removeChild(wrapper.querySelectorAll('.style-me-btn-wrap')[0]);
                }

                styleSdkIns.createTryOnButtons();
            }
        });
    });
</script>
